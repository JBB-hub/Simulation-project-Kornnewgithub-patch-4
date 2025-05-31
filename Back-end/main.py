import math
from parameter import Projectile, Launcher, BallDropper, Gearbox

def calculation(projectile: Projectile, launcher: Launcher, balldropper: BallDropper, gearbox: Gearbox):
    # คำนวณ omega
    omega = (gearbox.DrivenGear / gearbox.DriverGear) * gearbox.RPMmotor

    # คำนวณความเร็วของแท่ง
    stick_velocity = (omega * 2 * math.pi * launcher.stick_length) / 60

    # คำนวณความเร็วของแท่งและลูกบอล
    stickBall_velocity = stick_velocity * (launcher.stick_mass / (launcher.stick_mass + balldropper.Ball_mass)) * (1 / math.cos(math.radians(launcher.stick_theta)))

    # คำนวณความเร็วของลูกบอลหลังการกระเด้ง
    Ball_velocity = stickBall_velocity * balldropper.Bounce_coefficient

    # คำนวณเวลาการตกอิสระ
    t_freefall = math.sqrt((balldropper.BallDropper_height - launcher.Launcher_height) / (projectile.gravity / 2))

    # คำนวณเวลาของการเคลื่อนที่แบบโปรเจกไทล์
    a = -0.5 * projectile.gravity
    b = Ball_velocity * math.sin(math.radians(launcher.stick_theta))
    c = launcher.Launcher_height
    in_sqrt = b**2 - 4 * a * c
    if in_sqrt > 0:
        t_projectile1 = (-b + math.sqrt(in_sqrt)) / (2 * a)
        t_projectile2 = (-b - math.sqrt(in_sqrt)) / (2 * a)
        t_projectile = max(t_projectile1, t_projectile2)
    else:
        t_projectile = 0

    # สร้างลิสต์สำหรับเก็บข้อมูล
    list_freefall = []
    list_projectile = []

    # คำนวณการตกอิสระ
    timeStart = 0.0
    dt = 0.05
    while timeStart <= t_freefall:
        y_position = balldropper.BallDropper_height - (0.5 * projectile.gravity * (timeStart**2))
        v_freefall = projectile.gravity * timeStart
        list_freefall.append({
            't': round(timeStart, 2),
            'x': round(0, 2),
            'y': round(y_position, 2),
            'v': round(v_freefall, 2)
        })
        timeStart += dt

    # คำนวณการเคลื่อนที่แบบโปรเจกไทล์
    t_projectile += t_freefall
    timeStart = t_freefall
    while timeStart <= t_projectile:
        x_position = Ball_velocity * math.cos(math.radians(launcher.stick_theta)) * (timeStart - t_freefall)
        y_position = launcher.Launcher_height + Ball_velocity * math.sin(math.radians(launcher.stick_theta)) * (timeStart - t_freefall) - (0.5 * projectile.gravity * ((timeStart - t_freefall)**2))
        v_projectile = math.sqrt(
            (Ball_velocity * math.cos(math.radians(launcher.stick_theta)))**2 +
            (Ball_velocity * math.sin(math.radians(launcher.stick_theta)) - projectile.gravity * (timeStart - t_freefall))**2
        )
        list_projectile.append({
            't': round(timeStart, 2),
            'x': round(x_position, 2),
            'y': round(y_position, 2),
            'v': round(v_projectile, 2)
        })
        timeStart += dt

    # คืนค่าผลลัพธ์
    return {'freefall': list_freefall, 'projectile': list_projectile}

