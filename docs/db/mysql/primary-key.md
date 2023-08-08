# 主键

## Q&A

### 自增长组件存在哪些问题？

自增长主键会暴露`场外信息`，竞品可能通过注册账号判断产品的月获客数量。

但是如果使用UUID作为PK会存在性能问题：对于InnoDB，插入数据时并不是将数据放在表的末尾，而是会移动旧数据，后再插入新数据。对于大表而言，插入会非常缓慢。使用`varchar`
作为存储类型时，一条数据行占用的存储容量也比较大。

解决方案：

1. 设置datatype为`binary(16)`
2. 默认值设置为`uuid_to_bin(uuid(), 1)`

![img.png](/imgs/db/uuid-datatype.png)

但是对于master/slave，设置uuid为默认值会导致值不相同，mysql会抛出

```markdown
statement is unsafe because it uses a system function that may return a different value on the replica
```

最佳实践是设置`TRIGGER`，在插入数据时生成uuid：

```shell
DELIMITER ;;
CREATE TRIGGER before_insert_tablename
BEFORE INSERT ON tablename
FOR EACH ROW
BEGIN
  IF new.user_id IS NULL THEN
    SET new.user_id = UUID_TO_BIN(UUID(),1);
  END IF;
END
;;
```

![img.png](/imgs/db/uuid-pk.png)

观察user_id发现它们之间有很多相同的部分，似乎可以预测。原因是mysql中的`uuid()`使用的是v1，而且uuid并不是被设计为不可预测的，如果希望生成完全不相同的uuid，可以使用v4来生成。

因为存储的是二进制的uuid，在查询时需要decode下，转换成真实的uuid查询：

```shell
select * from users where user_id=uuid_to_bin('2edc7cee-3596-11ee-ba3a-4215a4f8edbc', 1);

# or

select * from users where bin_to_uuid(user_id, 1)='2edc7cee-3596-11ee-ba3a-4215a4f8edbc';
```

#### 拓展

删除`TRIGGER`的命令：

```shell
DROP TRIGGER [IF EXISTS] [schema_name.]trigger_name;
```

参考：
【1】[generating completely different uuid for mysql](https://stackoverflow.com/questions/61650560/generating-completely-different-uuid-for-mysql)
【2】[MySQL & UUIDs](https://lefred.be/content/mysql-uuids/)
