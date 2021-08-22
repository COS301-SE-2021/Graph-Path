import {React,Component} from "react";
import PropTypes from 'prop-types' ;
import {Icon, Panel,SelectPicker} from 'rsuite' ;


const ProjectCard = ({project})=>{
    return (
    <div>
        <Panel  shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}
        defaultActiveKey={1}
        >
        <Panel header="Project Card">
          <p>
            <small>Project Name:{project.projectName} </small>
          </p>
          <h6>
              Last Editted: {project.lastDateAccessed}
          </h6>
          <Icon icon='info' onClick={()=>console.log('clicked')}/>
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
            }]
        }
    }

    handleSortChange =(value)=>{
        console.log('value',value)

        this.setState({
            sortValue:value
        },()=>this.sortProjects()) ;
    }
    sortProjects = ()=>{
        //if recent? newest last aceess date comes first
        //if alphabetical ? project name is used to sort alphabetically
        //if date ? oldest project first
        console.log('sorting...')
    }

    render(){

        const options = [{
            label:'Recently Accessed',value:'recent'},{label:'Alphabetical',value:'alpha'},{label:'Date Created',value:'date'}] ;
        return( 
        <div data-testid="tidProjectManager">
            Projects For uSer <br/>
            <SelectPicker data={options} value={this.state.sortValue} onChange={this.handleSortChange}/>
            {this.state.projects.map((project)=>{
                return <>
                    <ProjectCard project={project} />
                    <br/>
                </>
            })}
            
        </div>)
    }
}

ProjectManager.propTypes = {

}

export default ProjectManager ; 