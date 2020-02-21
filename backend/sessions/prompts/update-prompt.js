const {Session, User} = require('../../models/index')

const updatePrompt = async args => {

  const { sessionId, promptId, displayIndex, io } = args;
  const session = await Session.findById(sessionId);
  const prompt = session.prompts.find(prompt => {
    return prompt._id == promptId;
  });

  prompt.displayIndex = displayIndex
  await session.save();

  io.emit("sessionChanged", session);
  io.emit("promptAsked", session);
  console.log(session.prompts)
  return session;
};

module.exports = { updatePrompt };
