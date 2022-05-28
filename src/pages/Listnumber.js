import React,{Component} from 'react';
import axios from 'axios';
import NumertableRow from './NumertableRow';


class Listnumber extends Component{
    constructor(props){
        super(props);
        this.state ={
            numers: []
        }
    }
    
    componentDidMount(){
                                    //4000
        axios.post('http://localhost:4000/numers/show-numer',
        {
            tokenclient:"tokentest@1234567890"
        })
        .then(res =>{
            this.setState({
                numers: res.data
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }


    DataTable = ()=>{
        return this.state.numers.map((res, i)=>{
            return <NumertableRow obj={res} key={i}/>
        })
    }
    render(){
        return(
            <center>
                <div>
                    <h1>ตัวอย่างสมการ</h1>
                    {this.DataTable()}
                </div>
            </center>
        )
    }
}
export default Listnumber;