# SE-CMS

**Team#1 Clinic Management System**

## [Clinic Management System Frontend](https://github.com/NTUT-108-SE/CMS-Frontend)

![GithubAction](https://github.com/NTUT-108-SE/CMS-Frontend/workflows/Test/badge.svg) ![GithubAction](https://github.com/NTUT-108-SE/CMS-Frontend/workflows/Build%20and%20Deploy/badge.svg) [![license:mit](https://img.shields.io/badge/license-mit-blue.svg)](https://opensource.org/licenses/MIT)

A project for [Clinic Management System](https://github.com/NTUT-108-SE/SE-CMS) frontend

- Use _Vuejs_ to develop.

## [Clinic Management System Backend](https://github.com/NTUT-108-SE/CMS-Backend)

![GithubAction](https://github.com/NTUT-108-SE/CMS-Backend/workflows/Python%20package/badge.svg) [![codecov](https://codecov.io/gh/NTUT-108-SE/CMS-Backend/branch/master/graph/badge.svg)](https://codecov.io/gh/NTUT-108-SE/CMS-Backend) [![GitHub](https://img.shields.io/github/license/NTUT-108-SE/CMS-Backend?color=blue)](https://github.com/NTUT-108-SE/CMS-Backend/blob/master/LICENSE) ![GitHub Pipenv locked Python version](https://img.shields.io/github/pipenv/locked/python-version/NTUT-108-SE/CMS-Backend)

A project for [Clinic Management System](https://github.com/NTUT-108-SE/SE-CMS) backend

- Use _python-flask_ to develop.
- Use _pytest_ to test.
- Use _hapi fhir server_ as database.
- Use _mongoDB_ as database.

## File structure

```
.
├── README.md
├── demoVideo
│   ├── FS.mkv
│   ├── MMS.mkv
│   ├── ORS.mkv
│   ├── PEHRS.mkv
│   ├── PIMS.mkv
│   ├── UIMLS.mkv
│   └── WMS.mkv
├── doc
│   ├── 20191225_SoftwareEngineering_ProjectPresentation(font).pdf
│   ├── 20191225_SoftwareEngineering_ProjectPresentation(font).pptx
│   ├── 20191225_SoftwareEngineering_ProjectPresentation.pptx
│   ├── Clinic Management System Midterm.pptx
│   ├── Team#1_PEP
│   │   ├── CMS.jpg
│   │   ├── Gantt.jpg
│   │   ├── Team#1_PEP.docx
│   │   ├── Team#1_PEP.pdf
│   │   └── WBS.png
│   ├── Team#1_SDD
│   │   ├── Dynamic Model
│   │   │   ├── FS
│   │   │   │   ├── FS-UC-01.png
│   │   │   │   └── FS-UC-02.png
│   │   │   ├── MMS
│   │   │   │   ├── MMS-UC-01.png
│   │   │   │   ├── MMS-UC-02.png
│   │   │   │   ├── MMS-UC-03.png
│   │   │   │   ├── MMS-UC-04_1.png
│   │   │   │   └── MMS-UC-04_2.png
│   │   │   ├── ORS
│   │   │   │   ├── ORS-UC-01.png
│   │   │   │   ├── ORS-UC-02.png
│   │   │   │   ├── ORS-UC-03.png
│   │   │   │   └── ORS-UC-04.png
│   │   │   ├── PEHRS
│   │   │   │   ├── PEHRS-UC-01.png
│   │   │   │   ├── PEHRS-UC-02.png
│   │   │   │   ├── PEHRS-UC-03.png
│   │   │   │   ├── PEHRS-UC-04_1.png
│   │   │   │   └── PEHRS-UC-04_2.png
│   │   │   ├── PIMS
│   │   │   │   ├── PIMS-UC-01.png
│   │   │   │   ├── PIMS-UC-02.png
│   │   │   │   ├── PIMS-UC-03.png
│   │   │   │   └── PIMS-UC-04.png
│   │   │   ├── UIMLS
│   │   │   │   ├── UIMLS-UC-01.png
│   │   │   │   ├── UIMLS-UC-02.png
│   │   │   │   ├── UIMLS-UC-03.png
│   │   │   │   ├── UIMLS-UC-04.png
│   │   │   │   ├── UIMLS-UC-05.png
│   │   │   │   ├── UIMLS-UC-06.png
│   │   │   │   └── UIMLS-UC-07.png
│   │   │   └── WMS
│   │   │       ├── WMS-UC-01.png
│   │   │       ├── WMS-UC-02.png
│   │   │       ├── WMS-UC-03.png
│   │   │       └── WMS-UC-04.png
│   │   ├── Interface Analysis
│   │   │   ├── 01_形象網頁_主畫面.png
│   │   │   ├── 02_形象網頁_最新資訊.png
│   │   │   ├── 03_形象網頁_掛號.png
│   │   │   ├── 04_形象網頁_關於本院.png
│   │   │   ├── 05_使用者管理_瀏覽使用者帳戶.png
│   │   │   ├── 06_使用者管理_新增使用者帳戶.png
│   │   │   ├── 07_使用者管理_個人資料設定.png
│   │   │   ├── 08_病人資訊管理_瀏覽病歷.png
│   │   │   ├── 09_病人資訊管理_新增病人.png
│   │   │   ├── 10_病歷管理_瀏覽病歷.png
│   │   │   ├── 11_病歷管理_新增病歷.png
│   │   │   ├── 12_掛號管理_瀏覽掛號.png
│   │   │   ├── 13_掛號管理_新增掛號.png
│   │   │   ├── 14_掛號管理_掛號時間設定.png
│   │   │   ├── 15_藥品管理_瀏覽藥品.png
│   │   │   ├── 16_藥品管理_新增藥品.png
│   │   │   ├── 17_財務管理_瀏覽收據.png
│   │   │   ├── 18_財務管理_新增收據.png
│   │   │   ├── 19_形象網頁設定_瀏覽公告.png
│   │   │   ├── 20_形象網頁設定_新增公告.png
│   │   │   └── 21_形象網頁設定_網頁設定.png
│   │   ├── Static Model
│   │   │   └── CMS_StaticModel.jpg
│   │   ├── Subsystem Architecture
│   │   │   ├── FS_SubsystemArchitecture.png
│   │   │   ├── MMS_SubsystemArchitecture.png
│   │   │   ├── ORS_SubsystemArchitecture.png
│   │   │   ├── PEHRS_SubsystemArchitecture.png
│   │   │   ├── PIMS_SubsystemArchitecture.png
│   │   │   ├── UIMLS_SubsystemArchitecture.png
│   │   │   └── WMS_SubsystemArchitecture.png
│   │   ├── System Architecture
│   │   │   └── CMS_SystemScope.png
│   │   ├── Team#1_SDD.doc
│   │   ├── Team#1_SDD.pdf
│   │   ├── Use Case
│   │   │   ├── FS_UseCase.drawio
│   │   │   ├── FS_UseCase.png
│   │   │   ├── MMS_UseCase.drawio
│   │   │   ├── MMS_UseCase.png
│   │   │   ├── ORS_UseCase.drawio
│   │   │   ├── ORS_UseCase.png
│   │   │   ├── PEHRS_UseCase.drawio
│   │   │   ├── PEHRS_UseCase.png
│   │   │   ├── PIMS_UseCase.drawio
│   │   │   ├── PIMS_UseCase.png
│   │   │   ├── UIMLS_UseCase.drawio
│   │   │   ├── UIMLS_UseCase.png
│   │   │   ├── WMS_UseCase.drawio
│   │   │   └── WMS_UseCase.png
│   │   └── _分工檔案
│   │       ├── CMS-CL.docx
│   │       ├── CMS.drawio
│   │       ├── FS and MMS - SDD.docx
│   │       ├── FS-sequence.drawio
│   │       ├── MMS-sequence.drawio
│   │       ├── ORS-sequence.drawio
│   │       ├── PEHRS-sequence.drawio
│   │       ├── PEHRS_SDD.doc
│   │       ├── PIMS-sequence.drawio
│   │       ├── SDD蕭文全.docx
│   │       ├── UIMLS-sequence.drawio
│   │       ├── UIMLS_SDD.doc
│   │       ├── WMS-sequence.drawio
│   │       └── sequence.drawio
│   ├── Team#1_SRS
│   │   ├── SRS - Clinic Management System.png
│   │   ├── SRS-FS.png
│   │   ├── SRS-MMS.png
│   │   ├── SRS-ORS.png
│   │   ├── SRS-PEHRS.png
│   │   ├── SRS-PIMS.png
│   │   ├── SRS-UIMLS.png
│   │   ├── SRS-WMS.png
│   │   ├── Team#1_SRS.doc
│   │   ├── Team#1_SRS.pdf
│   │   └── 分工檔案
│   │       ├── Team#1_SRS_1027.doc
│   │       ├── 劉孝忠srs.doc
│   │       ├── 古兆瑋SRS.docx
│   │       ├── 技術文字.docx
│   │       ├── 蕭文全SRS (1).docx
│   │       ├── 陳冠穎SRS.doc
│   │       └── 黃俊凱SRS.docx
│   ├── Team#1_STD
│   │   ├── Team#1_STD.doc
│   │   ├── Team#1_STD.pdf
│   │   └── _分工檔案
│   │       ├── CMS-TC.docx
│   │       ├── FS.docx
│   │       ├── MMS.docx
│   │       ├── STD-UIMLS.doc
│   │       └── STD-蕭文全.doc
│   ├── 參考文獻.md
│   ├── 會議記錄.md
│   └── 格式
│       ├── PEP_Sample.pdf
│       ├── SDD_Sample.pdf
│       ├── SRS_Sample.pdf
│       ├── STD_Sample.pdf
│       ├── pep.doc
│       ├── sdd.doc
│       ├── srs.doc
│       └── std.doc
└── project
    ├── CMS-Backend
    └── CMS-Frontend
```
