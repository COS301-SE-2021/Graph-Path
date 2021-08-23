import {React,Component} from "react";
import PropTypes from 'prop-types' ;
import {Icon, Panel,SelectPicker} from 'rsuite' ;
import "../css/ProjectManager.css"
import { Link } from "react-router-dom";


const ProjectCard = ({project})=>{
    return (
    <div>
        <Panel  shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}
        >
        <Panel header="Project Card">
          <p>
            <small>Project Name:{project.projectName} </small>
          </p>
          <h6>
              Last Editted: {project.lastDateAccessed}
          </h6>
          <Icon icon='info' onClick={()=>console.log('clicked')}/>
          <Link to="/project">Open</Link>
        </Panel>
      </Panel>
      </div>
    )
}

class ProjectManager extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            sortValue:'recent',
            projects:[{
                projectName:"T1",
                lastDateAccessed: new Date().toJSON().slice(0,17) ,
            },{
                projectName:"T2",
                lastDateAccessed: new Date("2021-08-22T16:00").toJSON().slice(0,17) ,
            },{
                projectName:"S2",
                lastDateAccessed: new Date("2021-08-12T16:00").toJSON().slice(0,17) ,
            },{
                projectName:"T1",
                lastDateAccessed: new Date().toJSON().slice(0,17) ,
            },{
                projectName:"T2 2",
                lastDateAccessed: new Date("2021-05-22T16:00").toJSON().slice(0,17) ,
            },{
                projectName:"S2 65",
                lastDateAccessed: new Date("2021-06-15T16:00").toJSON().slice(0,17) ,
            },{
                projectName:"T56",
                lastDateAccessed: new Date().toJSON().slice(0,17) ,
            },{
                projectName:"T2 3",
                lastDateAccessed: new Date("2021-03-23T16:00").toJSON().slice(0,17) ,
            },{
                projectName:"S2 45",
                lastDateAccessed: new Date("2021-08-15T16:00").toJSON().slice(0,17) ,
            }]
        }
    }

    handleSortChange =(value)=>{
        // console.log('value',value )
        this.setState({
            sortValue:value
        },()=>this.sortProjects()) ;
    }
    sortProjects = ()=>{
        //if recent? newest last aceess date comes first
        //if alphabetical ? project name is used to sort alphabetically
        //if date ? oldest project first
        console.log('sorting...') ;
        if (this.state.sortValue === 'recent'){
            let newArray = this.state.projects.sort((v1,v2,)=>{
                let date1=v1.lastDateAccessed.toLowerCase();
                let date2 = v2.lastDateAccessed.toLowerCase();

                if(date1<date2){
                    //date1 came first, put last
                    return 1 ;
                }
                if (date1>date2){
                    return -1 ;
                }
                return 0 ;
            }) ;
            this.setState({
                projects:newArray , 
            }) ;
        }
        else if (this.state.sortValue === 'alpha'){
            let sortedArray = this.state.projects.sort((v1,v2)=>{
                let date1 = v1.projectName.toLowerCase() ;
                let date2 = v2.projectName.toLowerCase() ;

                if (date1<date2){
                    return -1 ;
                }
                else if (date1>date2){
                    return 1 ;
                }
                return 0 ;
            })
            this.setState({
                projects:sortedArray
            }) ;
        }
    }

    render(){

        const options = [{
            label:'Recently Accessed',value:'recent'},{label:'Alphabetical',value:'alpha'},{label:'Date Created',value:'date'}] ;
        return( 
        <div data-testid="tidProjectManager">
           Projects <br/>
            <SelectPicker data={options} value={this.state.sortValue} onChange={this.handleSortChange}/>
            <div data-testid="tidProjList" id="projects-list">
                {this.state.projects.map((project,index)=>{
                return <ProjectCard key={`${index+1}${project.projectName}`} project={project} />    
                
            })}
            </div>
            
        </div>)
    }
}

ProjectManager.propTypes = {

}

export default ProjectManager ; 