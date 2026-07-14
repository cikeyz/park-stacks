# ParkStacks

<p align="center">
  <strong>Simulate a LIFO parking garage with live capacity, plates, and departure logs.</strong><br>
  Vanilla HTML, CSS, and JavaScript. Stack-backed parking model.
</p>

<p align="center">
  <a href="https://case-study-2-dsa-g3.vercel.app/">Live Demo</a>
  &nbsp;&middot;&nbsp;
  <a href="https://cikeyz.github.io/park-stacks/">GitHub Pages</a>
  &nbsp;&middot;&nbsp;
  <a href="#quick-start">Quick Start</a>
  &nbsp;&middot;&nbsp;
  <a href="#project-structure">Structure</a>
  &nbsp;&middot;&nbsp;
  <a href="#license">License</a>
</p>

<p align="center">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=111111">
  <img alt="License MIT" src="https://img.shields.io/badge/License-MIT-22c55e?logo=open-source-initiative&logoColor=white">
</p>

## Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Other design eras](#other-design-eras)
- [License](#license)
- [Course Note](#course-note)

## Overview

ParkStacks models a PUP-CEA style parking garage using a stack (LIFO). Park and
depart vehicles by plate, watch occupancy update in real time, and review arrival
and departure activity with light/dark theming.

## Features

| Feature | Description |
|---------|-------------|
| Stack parking | LIFO park/depart with capacity checks |
| Live board | Spot grid and occupancy counters |
| Plates | Manual entry or random plate helper |
| Logs | Arrival and departure movement stats |
| Theme toggle | Light and dark UI |

## Quick Start

```bash
git clone https://github.com/cikeyz/park-stacks.git
cd park-stacks
python -m http.server 8000
```

Open http://127.0.0.1:8000/

## Project Structure

```text
park-stacks/
├── index.html
├── script.js
├── styles.css
├── LICENSE
├── README.md
└── .gitignore
```

## Other design eras

| Branch | Notes |
|--------|-------|
| `overhaul/garage-redesign` | Multi-file CSS garage redesign (Case Study 2X). Design archive; do not merge into `main`. |

## License

MIT. See [LICENSE](LICENSE).

## Course Note

Built for CMPE 201 (Data Structures and Algorithms), Polytechnic University of
the Philippines, under Engr. Julian L. Lorico Jr.. Final project case study.
Published here as a standalone project.
