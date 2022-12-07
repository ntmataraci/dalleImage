const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const apiCon=async(req,res)=>{
  const getBody=JSON.parse(req.body)
  console.log(getBody)

const openai = new OpenAIApi(configuration);
const response = await openai.createImage({
  prompt: getBody.name,
  n: +getBody.qty,
  size: getBody.size,
});

res.status(200).json({myurl:response.data.data})

}

export default apiCon