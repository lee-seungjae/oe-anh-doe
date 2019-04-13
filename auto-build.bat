@echo off

REM tsc 빌드 안 되어 있을 때 webpack 실행하면 -w 모드에 들어가지 않고 바로 빠져나옴
call tsc

start cmd /k "title typescript && tsc -w"
start cmd /k "title webpack && npx webpack --mode=development -w"