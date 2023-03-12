# Student Helper AI
![Student Helper](https://i.imgur.com/CtHoURv.png)
## Project Description
This is the Student Helper project that I have built from the
ground up. This application can help you if you are studying in school or university. 
<br>
This allows you to save time on solving routine tasks.
Student Helper provides you 3 main services: Study Notes Creator, Grammar Correction, Essay Generator. Let's look at each one in more detail.
<br>
Project link - https://student-helperai.netlify.app/
<br>
### Study Notes Creator
You need to specify the number of key points and the topic, then OpenAI will generate study notes based on your prompt. 
This is very useful when you need to briefly learn the main aspects of a certain topic.
<br>
### Grammar Correction
You can provide text/sentence/word and this service will correct grammatical errors in the prompt, if there are any. 
This is very useful when you are not sure that you wrote a sentence correctly, or for example to check the text for grammatical errors.
<br>
### Essay Generator
You can use this service in order to create an whole essay with certain amount of sentences on the particular subject.
In my opinion, an essay is a thing that a student should write on his own 
to demonstrate his point of view, but sometimes there are situations, for example,
when the topic of the essay is absolutely not interesting or you do not have enough time to write it out, 
in those cases this service will be useful for you.
<br>
## Technologies used in the project:
Frontend:
  * React.js
  * Chakra UI 
  * Redux Toolkit.

Backend:
  + Nest.js
  + MongoDB
  + Mongoose
  + OpenAI API

## Improvements and additions
I want to emphisize that this is only a MVP version of the project, meaning, there may be some bugs and flaws. 
However, I will work on improving the project, adding new features and fixing bugs.
<br>
### Basic Plan for Project Improvement:
  * Add OAuth 2.0 social login with Facebook, LinkedIn. I tried to implement this functionality in Nest JS using Passport, everything worked fine locally, but production started to have problems, so I had to refuse it. I will implement this functionality with react-oauth package.
  * Add more services. I'm going to add some services like English to other languages, Translator difficult text into simpler concepts, Generate an outline for a research topic etc.
  * Add functionality to save results. Create profiles for each user, where they can check their history of using services, and grab results of each.
  * Redeploy an application to AWS or Google Clouds. Deploy it on more complex service, because backend part of an application deployed to railways only for deomnstrational purposes.
  * Create new Helpers, like Programmer Helper, Interviewer Helper etc. And collaborate this services with each other and create microservice architecture project.
