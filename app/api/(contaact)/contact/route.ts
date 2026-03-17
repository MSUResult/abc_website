



export async function POST (req : Request){

    const formData = await req.formData();

 const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");


  console.log(name , email , phone , message)

  const trqansporter = nodemailer.createTransport({
    host:'smtp.host.email',
    port:587,
    secure:true,
    auth:{
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASSWORD
    }
  })














}