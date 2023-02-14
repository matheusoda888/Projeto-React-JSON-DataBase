import Input from '../form/Input'
import {useEffect, useState} from 'react'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'
function ProjectForm({btnText, handleSubmit, projectData}){

   const [categories, setCategories] = useState([])
   const [project, setProject] = useState(projectData || {})

   useEffect(()=>{
      fetch('http://localhost:5000/categories',{
      method: 'GET',
      headers: {
         'Content-type':'application/json'
      }
   })
   .then((resp)=>resp.json())
   .then((data)=>{setCategories(data)})
   .catch((err)=>console.log(err))
   },[])

   function handleOnChange(e){
      setProject({...project,[e.target.name]:e.target.value})
      console.log(project)
   }

   function handleCategory(e){
      setProject({...project,category:{
         id:e.target.value,
         name:e.target.options[e.target.selectedIndex].text,
      }
      
      })
      console.log(project)
   }


   const submit = (e)=>{
      e.preventDefault()
      handleSubmit(project)
   }
 return (<form onSubmit={submit} className={styles.form}>
    <Input type='text' text='Nome do projeto' name='name' placeholder='Insira o nome do projeto' handleOnChange={handleOnChange} value={project.name?project.name:''}/>
    
    <Input type='text' text='Descrição do projeto' name='budget' placeholder='Insira a descrição do projeto' handleOnChange={handleOnChange} value={project.budget ? project.budget:''}/>
    
    <Select name='category_id' text='Selecione uma categoria' options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id:''}/>
    <SubmitButton text={btnText}/>
    
 </form>)
}
export default ProjectForm