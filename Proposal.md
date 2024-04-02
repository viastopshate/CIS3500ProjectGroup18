# Chrome Extension Idea: Chromagotchi

## Authors

Clara Fee, John Otto, Laya Yalamanchili, Via Liu 

## Problem Statement

Many people struggle to stay focused while working, especially because of the endless entertainment websites (Pinterest, YouTube, shopping, etc) that are easily accessible when browsing the web. In particular, it can be difficult for college students to block out large periods of time to study without getting distracted.

Our Chromagotchi extension provides motivation for users to spend less time on distracting websites and more time on school or work related websites. Spending time on self-identified “work” websites raises the Tamagotchi’s health, while spending time on distracting websites like Pinterest and YouTube lowers the Tamagotchi’s health! Through a cute and visually appealing interface, this would incentivize the user to spend less time on distracting websites and help improve productivity and focus. 

## Target Audience

Since this is intended as a time management and productivity tool, it will benefit people who struggle to stay on task and may get easily distracted by other tasks while working on one task. In particular, we envisioned that this tool would be useful for college students who need to set aside blocks of time to study or work. In addition, people who enjoy games and art could be incentivized by the visual Tamagotchi element to follow the schedule that they set for themselves. 

## Description

This chrome extension displays a miniature Tamagotchi, like a digital pet, at the top of your browser while you work. The tool mimics the original gameplay of a Tamagotchi: when you install the extension, your digital pet is “born” and you must take care of it, or else it’ll die! 

Upon installation, the user can choose their Tamagotchi’s appearance, and specify a list of sites that are distracting. The pet starts off with a 100% health bar; for every 10 minutes spent on a distracting website, the Tamagotchi’s health drops! If your pet’s health starts to get close to 0, a pop-up will appear to remind the user to switch to a work or school related website. Spending time on these non-distracting websites will restore your Tamagotchi’s health.

Opening a new tab will load a website that displays the tamagotchi and its health bar, the list of distracting/non distracting websites, plus information about the number of minutes spent on distracting vs. non-distracting websites in the current session. 

## Selling Points

1. Offers analytics on screen and web page usage, helping users refine their browsing habits for better time management.
2. Caring for the Tamagotchi encourages daily positive habits, such as taking breaks and focusing on tasks, enhancing productivity.
3. Encourages closing unused tabs and apps, leading to a more organized digital workspace and better device performance.
4. Allows users to specify which websites are distracting and which are work-related, allowing for customization to the user’s preferences.
5. Allows users to customize the appearance of their Tamagotchi, incentivizing a personal attachment to the digital pet, which makes the extension work better! 

## User Stories
1. As a freelancer, I want to set specific goals for work and break times and see how it affects my Tamagotchi's well-being, to better manage my work-life balance.
2. As a user, I want to see a clear warning when my Tamagotchi is about to "die" from too much distraction to prompt me to focus on work.
3. As a gamer, I want to unlock new features or appearances for my Tamagotchi by maintaining a healthy balance of productive and leisure time, adding a fun incentive to stay focused.
4. As a parent, I want to install this extension on my child's computer to help them learn about time management in a fun and interactive way.
5. As a team leader, I want to recommend this tool to my team members to help them stay focused during work hours, improving overall team productivity.
6. As a user interested in self-improvement, I want to track my progress over time and set personal records for productivity, making the process rewarding.
7. As a user, I want the option to share my Tamagotchi's health status on social media to share my progress with friends and perhaps create a friendly competition.
8. As a user, I want to be able to temporarily disable the extension for designated break times or days off, without negatively impacting my Tamagotchi's health.
9. As an easily distracted user, I want the extension to suggest a list of work-related websites based on my browsing habits to help me find productive alternatives to distracting sites.
10. As a user, I want to receive gentle reminders to take breaks based on how long I've been on productive sites to maintain a healthy work-life balance.
11. As a night owl, I want to adjust the monitoring schedule of the extension to fit my unconventional work hours, ensuring the health of my Tamagotchi aligns with my productive times.
12. As a user prone to long study sessions, I want the extension to encourage me to take regular breaks for the sake of both my health and the Tamagotchi's, promoting a healthier study routine.
13. As a web developer, I want the ability to whitelist development sites as productive, ensuring my work on coding projects contributes to my Tamagotchi's health.
14. As a content creator, I want to categorize research and inspiration browsing as productive time, allowing for a more nuanced understanding of productive vs. distracting time. 
15. As a user with multiple interests, I want to create different profiles for my Tamagotchi, each with its own set of productive and distracting sites, allowing me to switch focus between tasks (e.g., work, personal development, hobbies) without impacting my pet's health negatively. 
16. As a college student, I want to allocate dedicated time for studying without distractions so that I can improve my academic performance. 
17. As a remote worker, I want to minimize the time spent on entertainment websites during work hours, so that I can enhance my productivity and meet my work goals. 
18. As a user, I want to **identify websites that distract me from work, so that I can consciously avoid them and focus on my tasks. 
19. As a user, I want to receive notifications when my Tamagotchi’s health is low, so that I am reminded to return to work-related activities. 
20. As a student, I want to track how much time I spend on distracting versus non-distracting websites so that I can adjust my study habits for better outcomes.  
21. As a user, I want to have a cute and visually appealing interface for my productivity tool, so that I am more inclined to use it regularly.  
22. As a user, I want to receive analytics on my screen and webpage usage, so that I can understand and refine my browsing habits. 
23. As a user, I want to interact with my Tamagotchi by feeding it or playing with it during breaks, so that I am encouraged to take healthy breaks and return to work refreshed. 
24. As a user, I want to see a visual reminder of my progress towards my productivity goals, so that I am motivated to continue developing positive work habits. 

## Notes

## References & Inspiration 
One existing product that we could draw inspiration from is “Tabagotchi,” a very similar chrome extension tool. This tool lowers the health of the tamagotchi every time a new tab is opened, and the pet will die when too many tabs are closed. We could draw inspiration for visual and UI elements from this reference. 

## Technical Details

### User Interface

The extension will display a small sidebar that displays the tamagotchi design, its health bar, and a "settings" button.

The "settings" button will take you to a website. This website will display the tamagotchi and its health bar, the list of off task and on task websites with options to add websites and delete websites, and the total nubmer of minutes spent on task and off task. 

### API, Libraries, and Frameworks

We plan to use the React framework to build our tool.

### Data Storage

We need to store the current session's off task and on task time. We envision that we will store this data locally, using a JavaScript framework. 

## Project Management

### Collaboration and Task Allocation

- **Leader:** Clara
- **Manager:** Laya
- **Remaining Team Members:** [John, Via]

  Clara: Help with the visual and UI design. 
  Laya: Delegate tasks and make sure things are completed. 
  John: Help with the data storage component. 
  Via: Help with overall project management and the software architecture. 

We will use a shared GitHub respository to share code.

### Risks and Mitigation

A potential risk is adding too many features and being unable to accomplish tasks becuase we are new to the project. One way to mitigate these risks is by 

### Milestones and Timeline

- Week 1: draw up initial design, research & decide on stacks and frameworks, delegate tasks and start project
- Week 2: create framework for the project, build the UI components, get a functional tamagotchi display
- Week 3: add time storing functionality, add functionality to check which website user is on, create website to display all info
- Week 4: ensure that popup display works, ensure that website display works, integrate all components together]_
