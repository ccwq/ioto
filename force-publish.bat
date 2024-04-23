rem This script is used to publish the packages with the OTP

@echo off
set /p otp="Enter OTP: "
set NPM_CONFIG_OTP=%otp%
lerna publish --force-publish -y
