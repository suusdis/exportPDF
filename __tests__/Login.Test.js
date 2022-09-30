const Login = require('../helpers/Login');

//tests the login function if the person is autorised
test('login', async () => {
    const token = 'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDk3NjAzODEsImlhdCI6MTY0OTc1OTc4MSwiaXNzIjoiQ2xhcHBmb3JtIEIuVi4iLCJzdWIiOjEsInR5cGUiOiJhY2Nlc3MifQ.f_2VqL5orPj-zghI3agc8zC5kCtg_9bSqRN5kfOV5co_JP7cWfbhBpgwrqvcwnFHU6VUCpBxculzmaAxaPaowumqu3r1gycwWxEOB9d2VsYryHdgFMTr4DFXORgXjVHHNmDtsFMl2xZ2ETWoTYsQDVL7Y_Uht-taYRMZfWfZkP_-cR-lwUBIAJ9QwOCpGExcDdHwbLA6swm0VpontpFxVRHOzy77HQSd6l8pZ6Cy8K1VidLbX38ktX6M93oZQ4rp365jdPixVQp796xe_kKPwELx55pc5Vfw5NQLIn7tUHSgYgXKXPuP3LDSgoOgOBbj6MeN8D_fLcJH2Sz6DstHH2Q0Ngaxgu_b7JQmEKa-42OrcqHp-VNX_F8NvJR7UPQhqp6ORWD88eChQfnp7CZZm--eOVUIPpFo62vezGJvfuAGQI8yF2UzIgdZ3AGqP6QyogHy3tWWrWCkQJm4zjGdL-bYO2qsHE5CoBpgH4PHMVUGBCzTr3kOrDDprD8HL3jjEJzDI37kUWoNmlSeLQC0K3GGlbJTyAL2nB0nMkmkVD0MW_lwvcLEIUAuCJyK0um2Tl50i6nqwykK-WNQ0juUAM_C2v1moYJtMrg7jyDAuGzDCJ29GfCRwgLGD1McECmqQWwpIGu-OnbdX4SMgrEd0-lPOIWnCk7J8zgJWXW4Pw4';
    const auth = await Login("", token, "application/json");
 
    expect(auth).toBeTruthy();
});
