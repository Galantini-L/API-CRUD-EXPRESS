module.exports = (error,req,res,next)=>{
    console.error(error.name)
    if (error.name == 'CastError'){
        res.status(400).json({message:"Bad id request"})
    } else{
        res.status(500).end()
    }
}