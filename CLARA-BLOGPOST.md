---
title: "[Blog Post] Chromagotchi Development Journey"
description: "An analysis of our development process for Chromagotchi; our design decisions, mistakes, and lessons learned."
draft: false
tags: ["Featured"]
keywords: ["chromagotchi","development","clara fee", "blog", "blog post"]
aliases:
  - clara-blog/
---

# Chromagotchi Development Journey: Design Decisions, Mistakes, Lessons Learned

By Clara Fee

This blog post details my perspective on the Chromagotchi development process. I attempt to explore the various design and functionality decisions we made while developing the extension, focusing particularly on the reasoning behind these decisions and the lessons we learned during the process.

### Ideation

In the initial ideation phase, we decided that we wanted to make a tool that helped users improve their productivity. As college students, we wanted a tool that would help motivate us to stay on task; in particular, we discussed how easy it was to be distracted even when working on your personal work or school laptop.

We decided to try to design a tool that encouraged users to stay on task websites. We decided against creating a tool similar to a lockdown browser, or a tool that would totally bar the user from being on "off task" websites, because we all acknowledged that this would be too strict of a requirement and might be discouraging for our users. Instead, we intended to create a tool that took a more gentle and enouraging approach, which is how we ended up with the Tamagotchi idea!

### Initial design and proposed functionality

In our initial design, we decided to base our extension on the popular toy Tamagotchi. Tamagotchis are little digital pets that require the user to look after them, or else they die and you have to start over with a new pet! In the spirit of our productivity tool, and drawing on other popular digital pet features in communities like Neocities, we drew up a design that encouraged the user to spend time on productive websites.

In our initial design, we had an extensive list of features. We wanted to allow the user to upgrade their Chromagotchi, customize their avatar extensively, and manually label "off task" and "on task" websites. 

### Development process

Over the course of the development process, we had to make a lot of difficult decisions about functionality, constrained by time and also our collective technical ability. We decided to focus specifically on the time tracking functionality, ensuring that the extension correctly tracked the amount of time spent on all tabs in a given browser instance; we knew that this time tracking would lay the groundwork for the essential parts of our extension, and that we could build our features on top of this functionality. We also, in the end, decided to split the project into a couple parts: a popup and a landing page that contained most of the functionality.

In my opinion, the biggest lessons we learned over this development process were not about specific coding skills, design decisions, or even project design and development---although I and all of our members certainly learned a lot about all of those things. Instead, I think that the biggest takeaway that we came away with was learning how to effectively divide up work and work as a team on developing a software product. This is a difficult but critical process; really only one person can be coding a given file, and so it can be difficult to split up the project without losing control over its direction.

In our development process, we worked to be really intentional about how we were dividing work to remedy this. For example, splitting the project into a popup and landing page was helpful because it allowed two people to work on each, and (because the popup had much simpler interface and functionality) allowed those of us with less programming experience to contribute equally to the project. We did our best to tailer the project to each of our skills.

John primarily wrote the time tracking functionality, for example, because he had some experience with React; Via ended up writing a lot of the landing page functionality, as he had more experience with React and overall project design. Laya helped us out with creating a prettier and sleeker looking interface because she had graphic design background; I ended up helping Laya with the final style design because I was more familiar with HTML/CSS. I also helped integrate many of these different parts, and wrote the popup part of the project to help me learn and practice with React.

### Final product and my final thoughts

In the end, our final product is a reflection of many of the design decisions and lessons we learned along the way. We decided to modify our original idea slightly, and have the Chromagotchi's health depend on both time spent on different websites as well as the number of tabs open. This decision was made because we discovered that it was pretty easy to track the number of tabs, and we wanted to encourage users to keep their browser uncluttered and organized!

We also created a final product that was pretty organized as a coding project; a mistake we made early in the process was creating a code structure that was cluttered and unorganized, with a lot of redundant files and folders. About halfway through the project we ended up redesigning and condensing a lot of these files together, creating a project that was easier to work on for everyone.

Overall, we learned a lot about project management, software engineering, and overall how to design and develop a new software product from scratch, starting with ideation all the way to development and release. All of us worked collaboratively to make this happen, and we are very proud of our final product---hope you enjoy!

