interface FlightInfo {
    height: number,
    width: number,
    battery: number,
    totalMileage: number,
    introduce: () => void
}

class Uav implements FlightInfo {
    battery: number;
    height: number;
    totalMileage: number;
    width: number;

    constructor(battery: number) {
        this.battery = battery
    }

    introduce() {
        console.log('hello world')
    }
}

// 扑翼式微型无人机
class FlappingWingMicroDrone extends Uav {

}
