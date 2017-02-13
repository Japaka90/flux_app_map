import React, { Component } from 'react';
import PeopleListAction from '../../actions/PeopleListAction';
import FavoriteListAction from '../../actions/FavoriteListAction';
import '../../styles/font-awesome-4.7.0/css/font-awesome.min.css';

class MarkerInfo extends Component {     
    
    getMarkerInfo = () => {
        let mark = {};
        mark.name = this.props.markerName;
        mark.info = this.props.markerInfo;
        return mark
    }
    
    infoBoxStyle = () => {
        if(this.props.markerName) {
            return ({border: "1px solid black",
                    background: "lightblue"})
        }        
    }
    
    closingMarkerInfoButton = () => {
        if(this.props.markerName) {
            return (<i className="fa fa-times" aria-hidden="true"></i>)
        }
    }   
    
    addToFavoriteButton = () => {
        if(this.props.markerName) {
            return (<i className="fa fa-star" aria-hidden="true"></i>)
        }
    }   
    
    closeMarkerInfo = () => {
        PeopleListAction.getMarkersByPerson(this.props.person)
    }
    
    addToFavorite = () => {
        if (this.props.auth) {
            FavoriteListAction.addFavorite(this.props.markerName)
        } else {
            alert('Войдите, пожалуйста, в свой личный кабинет, если хотите добавить это место в избранное.')
        }
    }
            
    
    render() {
        
        let mark = this.getMarkerInfo();
        
        return(            
            <div className="place_info" style={this.infoBoxStyle()}>
                <div id="closingTag" onClick={this.closeMarkerInfo}>{this.closingMarkerInfoButton()}              
                </div>
                    
                <div id="affFavoriteTag" onClick={this.addToFavorite}>{this.addToFavoriteButton()}</div>
                
                <h3>{mark.name}</h3>
                <p>{mark.info}</p>            
            </div>
        )
    }
}

export default MarkerInfo;