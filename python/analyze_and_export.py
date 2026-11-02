import os
import json
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Ensure output directories exist
os.makedirs("python/outputs", exist_ok=True)
os.makedirs("src/data", exist_ok=True)

# 1. Load Dataset
csv_path = "python/enrollment_data.csv"
df = pd.read_csv(csv_path)

program_names = {
    "BS_CS": "BS Computer Science",
    "BS_ChE": "BS Chemical Engineering",
    "BS_IE": "BS Industrial Engineering",
    "BS_ME": "BS Mechanical Engineering",
    "BS_ECE": "BS Electronics Engineering"
}

program_labels = {
    "BS_CS": "BSCS",
    "BS_ChE": "BSChE",
    "BS_IE": "BSIE",
    "BS_ME": "BSME",
    "BS_ECE": "BSECE"
}

programs = ["BS_CS", "BS_ChE", "BS_IE", "BS_ME", "BS_ECE"]

# 2. Key calculations
# Totals per year
df["Total"] = df[programs].sum(axis=1)

# 2026 Snapshot
df_2026 = df[df["Year"] == 2026].iloc[0]
pop_2026 = {p: int(df_2026[p]) for p in programs}
total_2026 = int(df_2026["Total"])

shares_2026 = {
    p: {
        "program": p,
        "label": program_labels[p],
        "name": program_names[p],
        "count": int(df_2026[p]),
        "share_pct": round((float(df_2026[p]) / total_2026) * 100, 1)
    }
    for p in programs
}

# Correlation Matrix
corr_matrix = df[programs].corr()
corr_dict = {
    p1: {p2: round(float(corr_matrix.loc[p1, p2]), 2) for p2 in programs}
    for p1 in programs
}

# Trend Statistics
peak_year_cs = int(df.loc[df["BS_CS"].idxmax()]["Year"])
peak_val_cs = int(df["BS_CS"].max())
trough_year_total = int(df.loc[df["Total"].idxmin()]["Year"])
trough_val_total = int(df["Total"].min())
peak_year_ie = int(df.loc[df["BS_IE"].idxmax()]["Year"])
peak_val_ie = int(df["BS_IE"].max())

# Interpretations matching Figma and Activity requirements
interpretations = {
    "dataset": {
        "title": "Enrollment trends of five BS engineering and computing programs at UP Diliman, 2016–2026.",
        "description": "Explore program size, share of enrollment, yearly trends, and how programs move together."
    },
    "bar": {
        "title": "Student Population by Program (2026)",
        "description": f"This chart compares the number of enrolled students in each of the five programs in 2026. CS leads with {pop_2026['BS_CS']} students, followed by ECE ({pop_2026['BS_ECE']}), IE ({pop_2026['BS_IE']}), ChE ({pop_2026['BS_ChE']}), and ME ({pop_2026['BS_ME']}). ME is clearly the smallest program, with about 220 fewer students than CS."
    },
    "line": {
        "title": "Enrollment Trend by Program (2016–2026)",
        "description": f"This chart tracks yearly enrollment for each program over 11 years. All programs dropped after 2016, and total enrollment bottomed out at {trough_val_total:,} in {trough_year_total}. CS then grew steadily, peaking at {peak_val_cs} in {peak_year_cs}, and IE rose to its highest level ({peak_val_ie}) in {peak_year_ie}. ECE, ChE, and ME recovered only partly and remain below their 2016 levels."
    },
    "pie": {
        "title": "Share of Total Enrollment by Program (2026)",
        "description": f"This chart shows each program’s percentage of the {total_2026:,} students enrolled across the five programs in 2026. CS holds the largest share ({shares_2026['BS_CS']['share_pct']}%), then ECE ({shares_2026['BS_ECE']['share_pct']}%), IE ({shares_2026['BS_IE']['share_pct']}%), ChE ({shares_2026['BS_ChE']['share_pct']}%), and ME ({shares_2026['BS_ME']['share_pct']}%). Four programs are fairly close in size, while ME’s slice is noticeably smaller."
    },
    "heatmap": {
        "title": "Enrollment Correlation Between Programs",
        "description": f"This chart shows how closely the yearly enrollment of each pair of programs moves together, from -1 (opposite directions) to +1 (same direction). The strongest links are ChE with ECE ({corr_dict['BS_ChE']['BS_ECE']:.2f}), ChE with ME ({corr_dict['BS_ChE']['BS_ME']:.2f}), and CS with IE ({corr_dict['BS_CS']['BS_IE']:.2f}). CS has a weak negative relationship with ECE ({corr_dict['BS_CS']['BS_ECE']:.2f}) and almost none with ChE ({corr_dict['BS_CS']['BS_ChE']:.2f}). With only 11 years of data, these are patterns to investigate, not proof of cause."
    }
}

# Export analysis JSON
analysis_payload = {
    "metadata": {
        "source": "UP Diliman Office of the University Registrar (OUR)",
        "timeframe": "2016–2026",
        "programs": program_names,
        "labels": program_labels,
        "palette": {
            "green": "#1DB954",
            "dark1": "#212121",
            "dark2": "#121212",
            "gray1": "#535353",
            "gray2": "#B3B3B3",
            "bg": "#0D0F12"
        }
    },
    "interpretations": interpretations,
    "raw_csv": df.drop(columns=["Total"]).to_csv(index=False),
    "yearly_data": df.to_dict(orient="records"),
    "data_2026": {
        "total": total_2026,
        "breakdown": [shares_2026[p] for p in programs]
    },
    "correlation_matrix": {
        "programs": [program_labels[p] for p in programs],
        "values": [[corr_dict[p1][p2] for p2 in programs] for p1 in programs]
    },
    "summary_stats": {
        "total_2016": int(df[df["Year"] == 2016]["Total"].iloc[0]),
        "total_2026": total_2026,
        "trough_year": trough_year_total,
        "trough_total": trough_val_total,
        "cs_peak_year": peak_year_cs,
        "cs_peak_value": peak_val_cs,
        "ie_peak_year": peak_year_ie,
        "ie_peak_value": peak_val_ie
    }
}

with open("src/data/enrollment_analysis.json", "w") as f:
    json.dump(analysis_payload, f, indent=2)

with open("python/enrollment_analysis.json", "w") as f:
    json.dump(analysis_payload, f, indent=2)

print("JSON successfully exported to src/data/enrollment_analysis.json and python/enrollment_analysis.json")

# 3. Generate Spotify-Themed Matplotlib & Seaborn PNGs for Lab Deliverables
# Spotify Palette
c_green = "#1DB954"
c_dark1 = "#212121"
c_dark2 = "#121212"
c_gray1 = "#535353"
c_gray2 = "#B3B3B3"
c_bg = "#0B0C0E"
c_card = "#14161A"
series_colors = [c_green, c_gray2, c_gray1, c_dark1, "#737373"]

plt.rcParams.update({
    "font.sans-serif": "Arial",
    "text.color": "#FFFFFF",
    "axes.labelcolor": "#B3B3B3",
    "xtick.color": "#B3B3B3",
    "ytick.color": "#B3B3B3",
    "figure.facecolor": c_bg,
    "axes.facecolor": c_bg,
})

# A. Bar Chart (2026 Population)
fig, ax = plt.subplots(figsize=(9, 5), dpi=300)
labels = [program_labels[p] for p in programs]
values = [pop_2026[p] for p in programs]
bars = ax.bar(labels, values, color=[c_green, c_dark1, c_gray1, c_gray2, "#6E7681"], width=0.55, edgecolor="#2A2E33")
ax.grid(axis="y", linestyle="--", alpha=0.15, color="#FFFFFF")
ax.set_axisbelow(True)
ax.set_ylabel("Enrolled Students (2026)", fontsize=11, labelpad=10)
ax.set_title("Student Population by Program (2026)", fontsize=14, fontweight="bold", color=c_green, pad=15)
for bar in bars:
    yval = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2.0, yval + 8, f"{int(yval)}", ha="center", va="bottom", color="#FFFFFF", fontsize=10, fontweight="bold")
ax.set_ylim(0, 620)
for spine in ax.spines.values():
    spine.set_color("#2A2E33")
plt.tight_layout()
plt.savefig("python/outputs/bar_chart_2026.png", facecolor=c_bg)
plt.close()

# B. Line Chart (2016-2026 Trends)
fig, ax = plt.subplots(figsize=(10, 5.5), dpi=300)
prog_palette = {
    "BS_CS": c_green,
    "BS_ChE": "#737373",
    "BS_IE": c_gray1,
    "BS_ME": c_dark1,
    "BS_ECE": c_gray2
}
for p in programs:
    ax.plot(df["Year"], df[p], marker="o", markersize=5, linewidth=2.2, label=program_labels[p], color=prog_palette[p])

ax.grid(True, linestyle="--", alpha=0.15, color="#FFFFFF")
ax.set_axisbelow(True)
ax.set_xticks(df["Year"])
ax.set_ylabel("Number of Students", fontsize=11, labelpad=10)
ax.set_title("Enrollment Trend by Program (2016–2026)", fontsize=14, fontweight="bold", color=c_green, pad=15)
ax.legend(frameon=True, facecolor=c_card, edgecolor="#2A2E33", loc="upper right")
for spine in ax.spines.values():
    spine.set_color("#2A2E33")
plt.tight_layout()
plt.savefig("python/outputs/line_chart_trends.png", facecolor=c_bg)
plt.close()

# C. Pie Chart (2026 Shares)
fig, ax = plt.subplots(figsize=(8, 6), dpi=300)
pie_colors = [c_green, "#737373", c_gray1, c_dark1, c_gray2]
wedges, texts, autotexts = ax.pie(
    [pop_2026[p] for p in programs],
    labels=labels,
    autopct="%1.1f%%",
    startangle=90,
    colors=pie_colors,
    wedgeprops=dict(width=0.85, edgecolor="#0B0C0E", linewidth=2),
    pctdistance=0.72
)
for text in texts:
    text.set_color("#FFFFFF")
    text.set_fontsize(11)
for autotext in autotexts:
    autotext.set_color("#FFFFFF")
    autotext.set_fontweight("bold")
    autotext.set_fontsize(10)

ax.set_title("Share of Total Enrollment by Program (2026)", fontsize=14, fontweight="bold", color=c_green, pad=15)
plt.tight_layout()
plt.savefig("python/outputs/pie_chart_shares.png", facecolor=c_bg)
plt.close()

# D. Heatmap (Correlation Matrix)
fig, ax = plt.subplots(figsize=(8, 6.5), dpi=300)
corr_renamed = corr_matrix.rename(index=program_labels, columns=program_labels)
cmap = sns.dark_palette(c_green, as_cmap=True)
sns.heatmap(
    corr_renamed,
    annot=True,
    fmt=".2f",
    cmap=cmap,
    cbar=True,
    linewidths=1.5,
    linecolor="#0B0C0E",
    ax=ax,
    annot_kws={"size": 11, "weight": "bold", "color": "#FFFFFF"}
)
ax.set_title("Enrollment Correlation Between Programs", fontsize=14, fontweight="bold", color=c_green, pad=15)
plt.tight_layout()
plt.savefig("python/outputs/heatmap_correlations.png", facecolor=c_bg)
plt.close()

print("All 4 Spotify-themed PNG graphs generated in python/outputs/")
