# overlay (覆盖物)

## construct

- id，为对应的 overlay 设置一个 id，便于使用 ol.Map 的 getOverlayById 方法取得相应的 overlay；
- element，overlay 包含的 DOM element；
- offset，偏移量，像素为单位，overlay 相对于放置位置（position）的偏移量，默认值是 [0, 0]，正值分别向右和向下偏移；
- position，在地图所在的坐标系框架下，overlay 放置的位置；
- positioning，overlay 对于 position 的相对位置，可能的值包括 bottom-left、bottom-center、bottom-right
  、center-left、center-center、center-right、top-left、top-center、top-right，默认是 top-left，也就是 element 左上角与 position
  重合；
- stopEvent，地图的事件传播是否停止，默认是 true，即阻止传播，可能不太好理解，举个例子，当鼠标滚轮在地图上滚动时，会触发地图缩放事件，如果在
  overlay 之上滚动滚轮，并不会触发缩放事件，如果想鼠标在 overlay 之上也支持缩放，那么将该属性设置为 false 即可；
- insertFirst，overlay 是否应该先添加到其所在的容器（container），当 stopEvent 设置为 true 时，overlay 和 openlayers
  的控件（controls）是放于一个容器的，此时将 insertFirst 设置为 true ，overlay 会首先添加到容器，这样，overlay 默认在控件的下一层（CSS
  z-index），所以，当 stopEvent 和 insertFirst 都采用默认值时，overlay 默认在 控件的下一层；
- autoPan，当触发 overlay setPosition 方法时触发，当 overlay 超出地图边界时，地图自动移动，以保证 overlay 全部可见；
- autoPanAnimation，设置 autoPan 的效果动画，参数类型是 olx.animation.panOptions；
- autoPanMargin，地图自动平移时，地图边缘与 overlay 的留白（空隙），单位是像素，默认是 20像素；

## 支持的事件

- change，当引用计数器增加时，触发；
- change:element，overlay 对应的 element 变化时触发；
- change:map，overlay 对应的 map 变化时触发；
- change:offset，overlay 对应的 offset 变化时触发；
- change:position，overlay 对应的 position 变化时触发；
- change:positioning，overlay 对应的 positioning 变化时触发；
- propertychange，overlay 对应的属性变化时触发；
