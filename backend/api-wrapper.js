const apiWrapper = async (f, req, res, args) => {
  return res.json(f(args).catch(error => {
    console.log({error})
    return res.status(500).json(error)
  }))
}

module.exports = {apiWrapper}