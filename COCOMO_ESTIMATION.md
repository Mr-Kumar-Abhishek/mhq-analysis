# COCOMO Cost Estimation Report

## Project Sizing
Based on the analysis of the project's source code (HTML, CSS, JS, JSON), the total line count is approximately 1,103 lines.

**KLOC (Kilo Lines of Code):** 1.103

## Basic COCOMO Models
The Basic Constructive Cost Model (COCOMO) uses three different modes to estimate effort, development time, and staffing requirements depending on the project's complexity.

The formulas used are:
* **Effort (E):** `a * (KLOC)^b` in Person-Months (PM)
* **Development Time (T):** `c * (E)^d` in Months (M)
* **Average Staffing (S):** `E / T` in Persons
* **Estimated Cost:** `E * Average Monthly Salary`

*(Note: For the estimated pricing below, an average monthly developer salary of **$5,000 USD** is assumed. You can adjust this baseline depending on your region and team composition.)*

---

### 1. Organic Mode
**Best for:** Small teams with good experience working with less than strictly rigid requirements.
* **Coefficients:** a = 2.4, b = 1.05, c = 2.5, d = 0.38

**Calculations:**
* **Effort (E):** 2.4 * (1.103)^1.05 ≈ **2.66 Person-Months**
* **Time (T):** 2.5 * (2.66)^0.38 ≈ **3.63 Months**
* **Average Staffing:** 2.66 / 3.63 ≈ **0.73 Persons**
* **Estimated Pricing:** 2.66 PM * $5,000 USD/PM = **$13,300 USD**

---

### 2. Semi-detached Mode
**Best for:** Medium-sized projects with mixed levels of experience and a mix of rigid and semi-rigid requirements.
* **Coefficients:** a = 3.0, b = 1.12, c = 2.5, d = 0.35

**Calculations:**
* **Effort (E):** 3.0 * (1.103)^1.12 ≈ **3.35 Person-Months**
* **Time (T):** 2.5 * (3.35)^0.35 ≈ **3.83 Months**
* **Average Staffing:** 3.35 / 3.83 ≈ **0.88 Persons**
* **Estimated Pricing:** 3.35 PM * $5,000 USD/PM = **$16,750 USD**

---

### 3. Embedded Mode
**Best for:** Projects developed within a set of tight hardware, software, and operational constraints.
* **Coefficients:** a = 3.6, b = 1.20, c = 2.5, d = 0.32

**Calculations:**
* **Effort (E):** 3.6 * (1.103)^1.20 ≈ **4.05 Person-Months**
* **Time (T):** 2.5 * (4.05)^0.32 ≈ **3.91 Months**
* **Average Staffing:** 4.05 / 3.91 ≈ **1.04 Persons**
* **Estimated Pricing:** 4.05 PM * $5,000 USD/PM = **$20,250 USD**

---

## Summary Table

| Mode | Effort (Person-Months) | Time (Months) | Staffing (Persons) | Estimated Cost ($5k USD/mo baseline) |
|---|---|---|---|---|
| **Organic** | 2.66 | 3.63 | 0.73 | **$13,300 USD** |
| **Semi-detached** | 3.35 | 3.83 | 0.88 | **$16,750 USD** |
| **Embedded** | 4.05 | 3.91 | 1.04 | **$20,250 USD** |
