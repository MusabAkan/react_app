var root = ReactDOM.createRoot(document.getElementById("root"))

class User extends React.Component{
    constructor(props){
        super(props);
        this.changeEmail = this.changeEmail.bind(this)
        this.state={
            name:"Musab Akan",
            email:"musab.akan@hotmail.com"
        }
    }

    changeEmail(){
        this.state.email ="musab.akan@hotmail.com"
        console.log(this.state)

        root.render(<User/>)//tekrar çağırmamız gerektiğin için render ediliyor
    }

    render(){
        return(
            <div>
                <h2>{this.state.name}</h2>
                <p>{this.state.email}</p>
                <button onClick={this.changeEmail}>Change Email</button>
            </div>
        )
    }
}

root.render(<User/>)
