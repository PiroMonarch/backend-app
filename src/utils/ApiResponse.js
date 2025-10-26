 class ApiResponse {
           constructor(statusccode,data,message,success){
            this.statusccode = statusccode
            this.data = data
            this.message = message
            this.status = statusccode<400
       


           }
}

export{ApiResponse}
    


