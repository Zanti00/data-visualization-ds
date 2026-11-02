# Student Enrollment Visualization — Laboratory Activity Report & Answers

**Laboratory Activity:** Student Enrollment Visualization  
**Dataset:** UP Diliman Office of the University Registrar (OUR) Enrollment Statistics (2016–2026)  
**Programs Covered:**
- **BS CS:** BS Computer Science
- **BS ChE:** BS Chemical Engineering
- **BS IE:** BS Industrial Engineering
- **BS ME:** BS Mechanical Engineering
- **BS ECE:** BS Electronics Engineering

---

## 1. Dataset Summary & Exploratory Data Analysis (EDA)

The dataset contains the annual student enrollment across 5 undergraduate engineering and computing degree programs at UP Diliman over an 11-year period (2016 to 2026).

### Clean Tabular Data

| Year | BS CS | BS ChE | BS IE | BS ME | BS ECE | Total Enrollment |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **2016** | 433 | 542 | 456 | 375 | 637 | **2,443** |
| **2017** | 346 | 442 | 386 | 330 | 530 | **2,034** |
| **2018** | 340 | 447 | 371 | 322 | 497 | **1,977** (Trough) |
| **2019** | 390 | 410 | 343 | 325 | 517 | **1,985** |
| **2020** | 421 | 411 | 361 | 326 | 520 | **2,039** |
| **2021** | 465 | 471 | 411 | 366 | 548 | **2,261** |
| **2022** | 522 | 476 | 420 | 376 | 541 | **2,335** |
| **2023** | 555 | 449 | 428 | 356 | 493 | **2,281** |
| **2024** | 581 | 440 | 451 | 350 | 493 | **2,315** |
| **2025** | 556 | 410 | 469 | 325 | 496 | **2,256** |
| **2026** | 538 | 447 | 479 | 319 | 504 | **2,287** |

---

## 2. Item 2: Bar Chart of Student Population (2026)

### Visual Deliverable:
`python/outputs/bar_chart_2026.png` and interactive bar chart on the dashboard.

### Short Interpretation:
> **Title:** *Student Population by Program (2026)*  
> *This chart compares the number of enrolled students in each of the five programs in 2026. CS leads with 538 students, followed by ECE (504), IE (479), ChE (447), and ME (319). ME is clearly the smallest program, with about 220 fewer students than CS.*

### Key Insights:
- **BS Computer Science (538)** has overtaken all engineering degree programs by 2026, reflective of nationwide and global demand for software and AI specializations.
- **BS Electronics Engineering (504)** and **BS Industrial Engineering (479)** maintain strong second and third ranks.
- **BS Mechanical Engineering (319)** has experienced significant contraction relative to its 2016 baseline (375 students).

---

## 3. Item 3: Pie Chart Showing Percentage Distribution (2026)

### Visual Deliverable:
`python/outputs/pie_chart_shares.png` and interactive pie chart on the dashboard.

### 2026 Percentage Shares:

| Program | Enrolled Students (2026) | Percentage Share |
| :--- | :---: | :---: |
| **BS CS** | 538 | **23.5%** |
| **BS ECE** | 504 | **22.0%** |
| **BS IE** | 479 | **20.9%** |
| **BS ChE** | 447 | **19.5%** |
| **BS ME** | 319 | **13.9%** |
| **All Series** | **2,287** | **100.0%** |

### Short Interpretation:
> **Title:** *Share of Total Enrollment by Program (2026)*  
> *This chart shows each program’s percentage of the 2,287 students enrolled across the five programs in 2026. CS holds the largest share (23.5%), then ECE (22.0%), IE (20.9%), ChE (19.5%), and ME (13.9%). Four programs are fairly close in size, while ME’s slice is noticeably smaller.*

---

## 4. Item 4: Line Chart of Enrollment Trend (2016–2026)

### Visual Deliverable:
`python/outputs/line_chart_trends.png` and interactive line chart on the dashboard.

### Short Interpretation:
> **Title:** *Enrollment Trend by Program (2016–2026)*  
> *This chart tracks yearly enrollment for each program over 11 years. All programs dropped after 2016, and total enrollment bottomed out at 1,977 in 2018. CS then grew steadily, peaking at 581 in 2024, and IE rose to its highest level (479) in 2026. ECE, ChE, and ME recovered only partly and remain below their 2016 levels.*

### Key Insights & Turning Points:
1. **The 2017–2018 Dip**: Corresponds to the transition period following the nationwide implementation of the K-12 educational curriculum in the Philippines, which produced smaller university freshman intake cohorts. Total enrollment dropped from 2,443 to a trough of 1,977 in 2018.
2. **Post-2018 Recovery**: BS CS demonstrated the steepest rebound, climbing +70.9% from 340 students in 2018 to a peak of 581 in 2024.
3. **IE Resilience**: BS IE steadily climbed every single year between 2019 and 2026, reaching its peak of 479 students in 2026.

---

## 5. Item 5: Heatmap of Correlations

### Visual Deliverable:
`python/outputs/heatmap_correlations.png` and interactive correlation matrix on the dashboard.

### Pearson Correlation Matrix ($r$):

| | BS CS | BS ChE | BS IE | BS ME | BS ECE |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **BS CS** | 1.00 | -0.02 | 0.76 | 0.25 | -0.26 |
| **BS ChE** | -0.02 | 1.00 | 0.44 | 0.77 | 0.84 |
| **BS IE** | 0.76 | 0.44 | 1.00 | 0.23 | 0.14 |
| **BS ME** | 0.25 | 0.77 | 0.23 | 1.00 | 0.67 |
| **BS ECE** | -0.26 | 0.84 | 0.14 | 0.67 | 1.00 |

### Short Interpretation:
> **Title:** *Enrollment Correlation Between Programs*  
> *This chart shows how closely the yearly enrollment of each pair of programs moves together, from -1 (opposite directions) to +1 (same direction). The strongest links are ChE with ECE (0.84), ChE with ME (0.77), and CS with IE (0.76). CS has a weak negative relationship with ECE (-0.26) and almost none with ChE (-0.02). With only 11 years of data, these are patterns to investigate, not proof of cause.*

### Statistical Assessment:
- **Strong Positive Synchrony in Traditional Engineering**: ChE, ME, and ECE exhibit strong positive co-movements ($r = 0.84$ between ChE & ECE, $r = 0.77$ between ChE & ME). They follow common macroeconomic manufacturing and hardware cycles.
- **Computing vs. Engineering Decoupling**: BS CS enrollment behaves independently or counter-cyclically to ECE ($r = -0.26$) and ChE ($r = -0.02$), while showing a strong co-trend with Industrial Engineering ($r = 0.76$), likely reflecting modern tech/data analytics synergy.
