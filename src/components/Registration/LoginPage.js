import React, { Component } from 'react';
import { Link } from 'react-router';
import LogInAction from '../../actions/LogInAction';
import UserStore from '../../stores/UserStore';
import '../../styles/LoginPageStyle.css';
import sadCat from "../../img/sad_cat.jpg";

class LoginPage extends Component {
    
    componentWillMount() {
        this.state = {
         auth: UserStore.auth,
        };
    }

    componentDidMount() {
        UserStore.addChangeListener(this.onChange);
    };

     componentWillUnmount() {
        UserStore.removeChangeListener(this.onChange);
    };    
    
    onChange = () => {
        this.setState({            
            auth: UserStore.auth,                  
        })   
    }
    
    
    checkUser = () => {
        let login = this.login.value;
        let password = this.password.value; 
        
        for (let key in window.localStorage) {                     
            if (key === login) {               
                let user = JSON.parse(localStorage.getItem(key));  
                if (user.password === password) {                
                    LogInAction.logIn(login);      
                } else {alert('Неверный пароль')}    
            }
        }              
    }
    
    
    render() {
        return(
            <div className="login_page">
                <div className="login_box_wrapper">
                    <h2>Войти в личный кабинет</h2>
                    <form className="login">                      
                        <input type="text" id="username_input" ref={(input) => this.login = input} placeholder="Введите логин"/>
            
                        <input type="password" id="password_input" ref={(input) => this.password = input} placeholder="Введите пароль"/>
            
                        <Link to={this.state.auth ? '/' : ''}>
                            <input type="button" id="submit_btn" value="Войти" onClick={this.checkUser}/>
                        </Link>
            
                       <div className="home_link">
                            <Link to="/">
                                <input type="button" id="home_link_btn" value="Вернуться назад" />
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="login_additional_items">
                     
                    <div className="no_account_wrapper">
                        <p>У меня нет личного кабинета :(</p>
                        <img className="no_account_img" src={sadCat} alt="sad cat"/>
            
                        <div className="registration_link">
                            <Link to="/register"><input type="button" id="registration_btn" value="Зарегистрироваться"/></Link>
                        </div>
                    </div>


                    
                </div>
            </div>
        )
    }
    
}

export default LoginPage;