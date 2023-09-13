var root = ReactDOM.createRoot(document.getElementById("root"));

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.clearItems = this.clearItems.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.state = {
            gorevler: ['görev 1', 'görev 2', 'görev 3']
        }
    }

    deleteItem(item) {
        this.setState((prevState) => {
            const arr = prevState.gorevler.filter((i) => {
                return item != i;
            });
            return {
                gorevler: arr
            }
        });
    }

    clearItems() {
        this.setState({
            gorevler: []
        });
    }

    addItem(item) {

        if (this.state.gorevler.indexOf(item) > -1) {
            return 'aynı elemanı ekleyemezsiniz';
        }

        this.setState((prevState) => {
            return { gorevler: prevState.gorevler.concat(item) }
        });
    }

    render() {
        const data = {
            baslik: "Todo Application",
            aciklama: "Bekleyen Görevler",            
        }
        return (
            <div className="container"> 
                <div className="card">
                    <div className="card-header">
                        <Header title={ data.baslik } description={ data.aciklama } /> 

                    </div>
                    <div className="card-body">
                        <TodoList items={ this.state.gorevler } clear={this.clearItems} deleteItem={ this.deleteItem } /> 
                    </div>
                    <div className="card-footer">
                        <NewItem addItem={ this.addItem }/>

                    </div>
                </div>               
            </div>
        );
    }

    componentDidMount() {
        // console.log("component oluşturuldu.");
        const json_obj = localStorage.getItem("items");
        const item = JSON.parse(json_obj);
        if(item){
            this.setState({
                gorevler:item
            })
        }
    }

    componentDidUpdate(prevProps,prevState) {
        if(prevState.gorevler.length !== this.state.gorevler.length){
          const json_str = JSON.stringify(this.state.gorevler);
           localStorage.setItem("items", json_str)
        }
        // console.log("component güncellendi.");
    }
}

class Header extends React.Component {
    render() {
        return  (
            <div className="text-center"> 
                <h1 className="h3">{ this.props.title }</h1>
                <p> { this.props.description }</p>
            </div>
        );
    }
}

class TodoList extends React.Component {
    render() {
        return (
            <div>
                <ul className="list-group">
                    {
                        this.props.items.map((gorev,index) => <TodoItem key={index} item={gorev} deleteItem={ this.props.deleteItem } />)
                    }
                </ul>
                {
                    this.props.items.length > 0 
                    ?
                    <p>
                        <button className="btn btn-outline-danger float-end mt-3" onClick={this.props.clear}>Temizle</button>
                    </p>
                    :
                    <div className="alert alert-warning"> 
                        Bir görev ekleyiniz.
                    </div>

                }
            </div>
        );
    }
}

class NewItem extends React.Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            error: ''
        }
    }
    onFormSubmit(e) {
        e.preventDefault();

        const item = e.target.elements.txtItem.value.trim();
        if(item) {
            e.target.elements.txtItem.value = "";
            const error = this.props.addItem(item);
            this.setState({
                error: error
            })
        }
    }
    render() {
        return (
            <div>

                { this.state.error && <p> { this.state.error } </p> }
                <form className="input-group" onSubmit={this.onFormSubmit}>
                    <input className="form-control"type="text" name="txtItem" />
                    <button className="btn btn-" type="submit">Ekle</button>
                </form>
            </div>
        );
    }

    componentDidUpdate() {
        console.log("newitem component güncellendi.");
    }
}

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
    }
    deleteItem() {
        this.props.deleteItem(this.props.item);
    }
    render() {
        return (
            <li className="list-group-item">
                {this.props.item}
                <button className="btn btn-danger btn-sm float-end" onClick={this.deleteItem}>x</button>
            </li>
        );
    }

    componentWillUnmount() {
        console.log("eleman silindi");
    }
}

root.render(<TodoApp />);