from flask import Flask, request, jsonify
from flask_cors import CORS  # สำหรับแก้ปัญหา CORS
from parameter import Projectile, Launcher, BallDropper, Gearbox
from main import calculation  # Import the calculation function

app = Flask(__name__)
CORS(app)  # เปิดใช้งาน CORS

@app.route('/simulate')
def simulate():
    
    try:
        #รับข้อมูลจาก Front-end
        data = request.get_json()

        # สร้างออบเจ็กต์จากข้อมูลที่ได้รับ
        projectile = Projectile(gravity=data['gravity'])
        launcher = Launcher(
            Launcher_height=data['launcher']['Launcher_height'],
            stick_length=data['launcher']['stick_length'],
            stick_mass=data['launcher']['stick_mass'],
            stick_theta=data['launcher']['stick_theta']
        )
        balldropper = BallDropper(
            BallDropper_height=data['balldropper']['BallDropper_height'],
            Ball_mass=data['balldropper']['Ball_mass'],
            Bounce_coefficient=data['balldropper']['Bounce_coefficient']
        )
        gearbox = Gearbox(
            DrivenGear=data['gearbox']['DrivenGear'],
            DriverGear=data['gearbox']['DriverGear'],
            RPMmotor=data['gearbox']['RPMmotor']
        )

        # เรียกใช้ฟังก์ชัน calculation
        result = calculation(projectile, launcher, balldropper, gearbox)

        # ส่งผลลัพธ์กลับไปยัง Front-end
        return jsonify({'status': 'success', 'data': result})

    except Exception as e:
        # จัดการข้อผิดพลาดและส่งข้อความกลับไป
        return jsonify({'status': 'error', 'message': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
