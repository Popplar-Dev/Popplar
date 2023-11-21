# 서비스명 : Popplar

## 기획 배경

- 국내 핫플레이스들에 대한 인기가 높아진 만큼 길어진 웨이팅, 핫플레이스에서 같은 공간에서 지루한 대기 시간을 보내는 사람들끼리 서로 익명으로 대화하면서 핫플에 대한 정보도 공유하고, 게임도 하면서 즐겁게 웨이팅 시간을 보낼 수 있는 서비스.

## 주기능

1. 핫플레이스 맵 기능
    1. 지도에서 핫플레이스 표기(핫플레이스는 사람이 많이 방문할수록 레벨이 높아짐)
    2. 핫플레이스 주변으로 방문하면 핫플레이스에 입장 가능, 입장 시,  핫플레이스에서 익명의 유저들과 채팅과 간단한 게임이 가능함, 핫플레이스 범위를 나가면 일정 시간 후 모든 기능 사용 불가.
    3. 핫플레이스 입장 시 핫플레이스에 방문해있는 유저들의 위치 정보를 지도에서 확인 (on / off)  ⇒ 특정 사용자에게 쪽지를 보낼 수 있는 기능도 제공.
    4. 핫플레이스 입장 시 도장을 찍을 수 있음. ⇒ 수집 개수에 따른 칭호 부여
    5.
2. 핫플레이스 게임 기능
    1. 핫플레이스에 입장한 사용자들끼리 간단한 게임(끝말잇기)을 할 수 있음
        1. 미니게임과 10분마다 랜드마크 쟁탈전(5초안에 버튼 클릭 횟수<좋은데?>)
    2. 게임에서 최종 1위한 사용자는 일정 시간 동안 해당 핫플레이스의 정복자가 될 수 있음
        1. 정복자는 경험치와 함께, 채팅룸에서 특별한 메시지를 날릴 수 있음
        2. 경험치가 올라가면 캐릭터 디자인과 채팅 색상이 변경됨
3. 사용자 정의 핫플레이스 등록
    1. 사용자는 핫플레이스 등록을 원하는 지역을 검색해 씨앗을 심을 수 있음
    2. 다른 사용자들이 해당 핫플레이스에 투표를 해주면 일정 투표 수 이후 싹이 틈, 이후 핫플레이스 서비스가 열림


<div align="center">
<!-- <img src="https://github.com/fluffymn/readme-test/assets/55385934/faace829-e55b-4d32-ac3a-62af250bf783"/> -->
<h2>
	위치 기반 익명 채팅 및 SNS 서비스 
	<img src="https://github.com/fluffymn/readme-test/assets/55385934/46ec4e62-f38a-4f76-bfa2-dbe8085ce0f1" width=30/>
</h2>

<p>
<a href="https://play.google.com/store/apps/details?id=com.popplar.myapplication&hl=ko-KR"> 지금 바로 플레이스토어에서 설치해보기</a>
</p>

[프로젝트 소개](#🚀-프로젝트-소개) • [주요 기능](#✨-주요-기능) • [기술 스택](#🔧-기술-스택)• [인프라 구조](#⚙️-인프라-구조)• [개발 일지](#📚-팀-개발-일지)• [팀원 소개](#👩‍💻-팀원-소개)

</div>

## 🎉 프로젝트 소개

 <table>
    <tr>
<!--       <td align="center"><img src="https://github.com/fluffymn/readme-test/assets/55385934/f3324c96-e216-453d-84e0-5dd9cf1a9a68" /></td>
      <td align="center"><img src="https://github.com/fluffymn/readme-test/assets/55385934/0087115c-7aaf-476e-9983-233038ab2fb6" /></td>
            <td align="center"><img src="https://github.com/fluffymn/readme-test/assets/55385934/de5911ee-24e8-4d11-bc78-cde9bc1e6360" /></td> -->
    </tr>
    </table>

<b>서비스 설명</b>

 **위치 기반 실시간 소셜 모바일 앱 서비스**
내 주변 장소가 궁금한 여행자🚩, 익명의 사용자와 자유롭게 소통하고 싶은 사람들🤸‍♀️을 위해 **POPPLAR**가 탄생했습니다! **POPPLAR**를 통해 아지트를 방문하고 즐거운 시간을 함께 나누세요!


<br />


## ✨ 주요 기능
- 우리껄로 다 바꾸기 기능별로
<div align="center">
 <table>
    <tr>
      <td align="center" style="font-weight: bold; font-size: 18;">로그인 화면</td>
      <td align="center" style="font-weight: bold; font-size: 18;">메인 화면</td>
    </tr>
    <tr>
<!--       <td align="center"><img src="https://github.com/fluffymn/readme-test/assets/55385934/f3324c96-e216-453d-84e0-5dd9cf1a9a68" /></td>
      <td align="center"><img src="https://github.com/fluffymn/readme-test/assets/55385934/0087115c-7aaf-476e-9983-233038ab2fb6" /></td> -->
    </tr>
	<tr>
      <td align="center">소셜 로그인으로 로그인이 가능한 페이지</td>
      <td align="center">로그인 후 자동으로 메인 화면 접속</td>
    </tr>
    <tr>
      <td align="center" style="font-weight: bold; font-size: 18;">지도 화면</td>
      <td align="center" style="font-weight: bold; font-size: 18;">핫플레이스 상세 정보</td>
    </tr>
    <tr>
<!--       <td align="center"><img src="https://github.com/fluffymn/readme-test/assets/55385934/de5911ee-24e8-4d11-bc78-cde9bc1e6360" /></td>
      <td align="center"><img src="https://github.com/fluffymn/readme-test/assets/55385934/fcc377e2-c916-4a50-a111-5364fd810083" /></td> -->
    </tr>
    <tr>
      <td align="center">지도에서 핫플레이스 표기(핫플레이스는 사람이 많이 방문할수록 레벨이 높아짐</td>
      <td align="center">핫플레이스 주변으로 방문하면 핫플레이스에 입장 가능, 입장 시,  핫플레이스에서 익명의 유저들과 채팅과 간단한 게임이 가능함, 핫플레이스 범위를 나가면 일정 시간 후 모든 기능 사용 불가.</td>
    </tr>
    <tr>
      <td align="center" style="font-weight: bold; font-size: 18;">다른 유저 정보</td>
      <td align="center" style="font-weight: bold; font-size: 18;">스탬프 기능</td>
    </tr>
    <tr>
<!--       <td align="center"><img src="https://github.com/fluffymn/readme-test/assets/55385934/9dc8e364-23c2-4eb1-b494-8b55eccf3e10" /></td>
      <td align="center"><img src="https://github.com/fluffymn/readme-test/assets/55385934/74360783-3961-49f9-8ef4-f6123a897457" /></td> -->
    </tr>
    <tr>
      <td align="center">핫플레이스 입장 시 핫플레이스에 방문해있는 유저들의 위치 정보를 지도에서 확인 (on / off)  ⇒ 특정 사용자에게 쪽지를 보낼 수 있는 기능도 제공.</td>
      <td align="center">핫플레이스 입장 시 스탬프 찍을 수 있음. ⇒ 수집 개수에 따른 칭호 부여</td>
    </tr>
    <tr>
      <td align="center" style="font-weight: bold; font-size: 18;">보낸 메시지 확인</td>
      <td align="center" style="font-weight: bold; font-size: 18;">즐겨찾기</td>
    </tr>
    <tr>
<!--       <td align="center"><img src="https://github.com/fluffymn/readme-test/assets/55385934/665f18f2-8dbe-4b8f-a2c9-d12a0608cdba" /></td>
      <td align="center"><img src="https://github.com/fluffymn/readme-test/assets/55385934/9291d0f5-0f66-4bca-b93d-8ff4befda04a" /></td> -->
    </tr>
    <tr>
      <td align="center">메인 화면의 오른쪽 상단의 'My' 버튼을 터치하여<br>마이 페이지로 접속<br>'보낸버블' 탭에서 보낸 메시지들 확인 가능</td>
      <td align="center">친구의 메인화면 오른쪽 하단의 '★' 버튼을 터치하여 즐겨찾기에 추가 가능<br>자신의 메인 화면의 오른쪽 상단의 'My' 버튼을 터치하여<br>마이 페이지로 접속<br>'즐겨찾기' 탭에서 친구들 확인 가능</td>
    </tr>
    <tr>
      <td align="center" style="font-weight: bold; font-size: 18;">상태메시지 변경</td>
      <td align="center" style="font-weight: bold; font-size: 18;">설정</td>
    </tr>
    <tr>
<!--       <td align="center"><img src="https://github.com/fluffymn/readme-test/assets/55385934/337b67ca-2e81-4c00-b92a-33d2ff727cb7" /></td>
      <td align="center"><img src="https://github.com/fluffymn/readme-test/assets/55385934/e304e708-85e5-43c7-aa2c-5eb9beee90ca" width=475 /></td> -->
    </tr>
        <tr>
      <td align="center">메인 화면의 중앙 상단의 상태 메시지를 터치하여<br>상태 메시지 수정 가능</td>
      <td align="center">메인 화면의 오른쪽 상단의 'My' 버튼을 터치하여<br>마이페이지 접속 가능<br>마이페이지의 오른쪽 상단의 'Settings' 버튼을 터치하여<br>설정페이지 접속 가능
      <br>프로필 수정 및 로그아웃, 탈퇴, 고객센터 문의 가능</td>
    </tr>
 </table>
 
</div>

<br />

## 🔧 기술 스택
- 이것도 우리껄로 바꾸기
### Back-end
<div>
	<img src="https://img.shields.io/badge/Java%2017-3766AB?style=flat-square&logoColor=white"/>
	<img src="https://img.shields.io/badge/Kotlin-7F52FF?style=flat-square&logo=kotlin&logoColor=white" />
	<img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=spring&logoColor=white" />
	<img src="https://img.shields.io/badge/Gradle-02303A?style=flat-square&logo=gradle&logoColor=white" />
	<img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white" />
	<img src="https://img.shields.io/badge/Spring%20Data%20JPA-6DB33F?style=flat-square&logoColor=white"/>
	<img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20web%20tokens&logoColor=white" />
	<img src="https://img.shields.io/badge/MSA-FF4655?style=flat-square&logoColor=white"/>
</div>

### Front-end
<div>
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
	<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=black" />
	<img src="https://img.shields.io/badge/React%20Native-61DAFB?style=flat-square&logo=react&logoColor=black" />
	<img src="https://img.shields.io/badge/Recoil-3578E5?style=flat-square&logo=recoil&logoColor=black" />
	<img src="https://img.shields.io/badge/Android-3DDC84?style=flat-square&logo=android&logoColor=white" />
</div>

### Infra
<div>
	<img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" />
	<img src="https://img.shields.io/badge/Jenkins-D24939?style=flat-square&logo=jenkins&logoColor=white" />
	<img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=flat-square&logo=amazonec2&logoColor=white" />
</div>

### Tools
<div>
	<img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white" />
	<img src="https://img.shields.io/badge/GitLab-FC6D26?style=flat-square&logo=gitlab&logoColor=white" />
	<img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white" />
	<img src="https://img.shields.io/badge/Jira-0052CC?style=flat-square&logo=jira&logoColor=white" />
	<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white" />
	<img src="https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white" />
</div>
<br />

<br />

## ⚙️ 인프라 구조

<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/81518305/284465263-8bb27a8c-f305-40e1-9d16-bb2d59a8d4b8.png" width="800" />

<br />



<br />

## 📚 팀 ASHE 개발 일지

- 추가할거 하셈요

<br />

## 👩‍💻 팀원 소개

  <table align="center">
		<h3 align="center">Back-end</h3>
    <tr>
      <td align="center"><img src="https://github.com/joonsuk12.png" width="160"></td>
      <td align="center"><img src="https://github.com/OhSeongRak.png" width="160"></td>
      <td align="center"><img src="https://github.com/pxxnxx.png" width="160"></td>
    </tr>
    <tr>
      <td align="center">오준석</td>
      <td align="center">오성락</td>
      <td align="center">김민석</td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/joonsuk12" target="_blank">@joonsuk12</a></td>
      <td align="center"><a href="https://github.com/OhSeongRak" target="_blank">@OhSeongRak</a></td>
      <td align="center"><a href="https://github.com/pxxnxx" target="_blank">@pxxnxx</a></td>
    </tr>
	</table>
	<table align="center">
		<h3 align="center">Front-end</h3>
    <tr>
      <td align="center"><img src="https://avatars.githubusercontent.com/u/77910839?s=96&v=4" width="160"></td>
      <td align="center"><img src="https://github.com/JiwooPaeng/JiwooPaeng/assets/122685653/2c41b503-5227-4ce9-a889-a67661c24736&v=4" width="160"></td>
      <td align="center"><img src="https://github.com/JPark11.png" width="160"></td>
    </tr>
    <tr>
      <td align="center">서동훈</td>
      <td align="center">팽지우</td>
      <td align="center">박재은</td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/gns9541" target="_blank">@gns9541</a></td>
      <td align="center"><a href="https://github.com/JiwooPaeng" target="_blank">@JiwooPaeng</a></td>
      <td align="center"><a href="https://github.com/JPark11" target="_blank">@JPark11</a></td>
    </tr>
  </table>
