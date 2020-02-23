const {Session, User} = require('../../models/index')

const answerPrompt = async args => {

  const { username, sessionId, promptId, response, io } = args;
  const session = await Session.findById(sessionId);
  const user = await User.findOne({ email: username });
  const prompt = session.prompts.find(prompt => {
    return prompt._id == promptId;
  });

  const matchingPrompt = prompt.answers.find(answerPrompt => {
    console.log({answerPrompt, user})
    console.log(answerPrompt.user)
    console.log(user._id)
    console.log(answerPrompt.user.equals(user._id))
    return answerPrompt.user.equals(user._id)
  })
  if (matchingPrompt) {
    matchingPrompt.response = response
    console.log({ session })
    session.save();
  }
  else {

    prompt.answers.push({ user: user._id, response });
    console.log({ session })
    session.save();
  }

  io.emit("sessionChanged", session);
  return session;
};

module.exports = { answerPrompt };
