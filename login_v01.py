#1.회원가입을 통해 내 ID, PW를 저장.
#2.로그인 화면에서 내 ID, PW를 입력해 둘 다 맞는 경우 로그인 성공, 아니면 실패
#3.여러번 로그인 실패 시 보안강화

#2
import time
count = 0
mins = 0
while True:
    #ID,PW 입력
    ID = input("ID 입력: ")
    PW = input("PW 입력: ")
    #ID와 PW 일치하는지 비교
    if ID == 'guest' and PW == '0000':
        print("로그인 되었습니다.")
        break
    else:
        count += 1
        print("로그인 {}회 실패".format(count))
    if count == 3:
        print('10분 뒤에 다시 입력하세요')
        while mins != 10:
            time.sleep(60)
            mins += 1
            print(">>>>> {}분 경과했습니다.".format(mins))
    elif count == 5:
        print("로그인 불가입니다.")
        break

'''
import time
run = input("start? > ")
mins = 0
if run == "yes":
    while mins != 20:
        print(">>>>>", mins)
        time.sleep(60)
        mins += 1
'''