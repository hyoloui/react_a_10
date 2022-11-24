# 🎈react_a_10 
# S.A (팬PicK)📝


# Project : 팬PicK

- [x]  제목
- [x]  와이어프레임
- [x]  기능 분류

### 22-11-18
첫 번째 회의


> 프로젝트 서비스 키워드 : 

스터디(채팅)

새상품(거래)

사이드프로젝트(매칭)

반려동물(커뮤니티)

챌린저스(매칭)

🚩**팬(커뮤니티)**

> 


### 제목

> 프로젝트 네임 :


홍보팬

팬결고리

🚩**팬Pick - fix**
> 


- 참조 레퍼런스
    
    [#팬픽 : 스타와 팬이 함께하는 공간](https://shopfanpick.com/)
    
    [Disquiet*](https://disquiet.io/)
    
    [velog](https://velog.io/)
    


### 와이어 프레임

[10조 와이어프레임](https://xd.adobe.com/view/400da440-ac14-4f56-9d0c-c401c6708c34-155e/)


### 기능 분류

- 과제형 구현 기능
    - 로그인, 회원 가입 = **김도원, 강창순**
        - Authentication 에서 제공하는 api를 이용하여 아래 회원 가입, 로그인을 구현해보세요.
            - 아이디(이메일), 패스워드 로그인 및 회원가입
            - 소셜 로그인 (구글, 깃헙)
    - CRUD = **이승효, 임홍구**
        - Firestore 에서 제공하는 api를 이용하여 CRUD 데이터베이스 핸들링을 구현해보세요.
        - CUD(등록, 수정, 삭제)가 일어날 때 마다 R(조회)해서 자연스럽게 화면 변경을 해보세요.
    - 마이 페이지 = **김미영**
        - 내 게시물 보기
            - Authentication 에서 제공하는 uid 를 이용해서 내 게시물을 모아서 조회해 보세요.
        - 프로필 수정 기능
            - Cloud Storage 에서 제공하는 api를 이용하여 이미지 업로드와 다운로드 url 을 받아서 이미지 핸들링을 해보세요.
    - 배포하기
        - S3를 이용해서 배포하실 때는, 완성 후에 배포하지 않으셔도 됩니다! 여유가 있을 때 미리 배포해두고 새로운 내용을 반영시키면 프로젝트 마감 시에 조급하게 배포하지 않아도 됩니다.
        - 가비아에서 저렴한 도메인(500원)을 구매하신 후 AWS Route 53(DNS 서버)과 가비아(네임 서버) 설정을 통해 도메인 연결을 해보세요.
    - Git을 최대한 활용해보기!
        - Pull Request 활용하기!
            - Merge는 Pull Request를 활용하여 진행한다.
            - 참고
                - [https://xo.dev/github-collaboration-guide/#pull-request-만들기](https://xo.dev/github-collaboration-guide/#pull-request-%EB%A7%8C%EB%93%A4%EA%B8%B0)
        - Branch 만들어 작업하기
            - 참고
                - [https://xo.dev/github-collaboration-guide/#git-브랜치-만들어-작업하기](https://xo.dev/github-collaboration-guide/#git-%EB%B8%8C%EB%9E%9C%EC%B9%98-%EB%A7%8C%EB%93%A4%EC%96%B4-%EC%9E%91%EC%97%85%ED%95%98%EA%B8%B0)
                - [https://blog.outsider.ne.kr/1505](https://blog.outsider.ne.kr/1505)
        - 코드 리뷰 해보기!
            - 참고
                - [https://xo.dev/github-collaboration-guide/#코드-리뷰-하기](https://xo.dev/github-collaboration-guide/#%EC%BD%94%EB%93%9C-%EB%A6%AC%EB%B7%B0-%ED%95%98%EA%B8%B0)


- 프로젝트 선택 기능 (우선순위)
    
    
    1. 즐겨찾기 정렬
        - 카테고리 별 즐겨찾기 - 카운트 기능
        - Hot 셀럽 카테고리에 즐겨찾기 카운트 순서로 정렬
    2. 게시글 정렬
        - 최신 순 정렬 (Default)
        - 좋아요 순 정렬
    3. 댓글
        - 글마다 댓글을 작성할 수 있도록 추가 (좋아요?)
        - 댓글 수정 및 삭제
    4. 검색
        - 검색 창 생성하여 검색 기능 구현 (카테고리, 글)
    5. 좋아요
        - 게시 글 마다 좋아요 기능 추가
        - 버튼 누르면 빨간색으로 변하여 좋아요 활성 상태 제공
    


## 프로젝트 일정

- [x]  11-21 (D-7) / 프로젝트 깃허브 연동 및 브랜치 동기화 / firebase 연동
- [x]  11-22 (D-6) / 업무별 브랜치에 작업 진행
- [x]  11-23 (D-5) / 업무별 브랜치 작업 마무리
- [ ]  11-24 (D-4) / 코드리뷰 , dev 브랜치에 PR
- [ ]  11-25 (D-3) / 업무별 브랜치에서 테스트 및 디버깅
- [ ]  11-28 (D-day) / 브랜치 마무리 작업 및 main 에 PR
