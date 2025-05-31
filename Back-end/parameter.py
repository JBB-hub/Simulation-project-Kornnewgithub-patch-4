import math

class Projectile:
    def __init__(self, gravity=9.81):
        self.gravity = gravity

class BallDropper:
    def __init__(self, BallDropper_height=float, Ball_mass=float, Bounce_coefficient=float):
        self.BallDropper_height = BallDropper_height
        self.Ball_mass = Ball_mass
        self.Bounce_coefficient = Bounce_coefficient

class Launcher:
    def __init__(self, Launcher_height=float, stick_length=float, stick_mass=float, stick_theta=float):
        self.Launcher_height = Launcher_height
        self.stick_length = stick_length
        self.stick_mass = stick_mass
        self.stick_theta = stick_theta

class Gearbox:
    def __init__(self, DriverGear=30, DrivenGear=36, RPMmotor=float):
        self.DrivenGear = DrivenGear
        self.DriverGear = DriverGear
        self.RPMmotor = RPMmotor

