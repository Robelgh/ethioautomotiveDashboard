import React ,{useEffect,useState} from 'react'
import axios from 'axios'

import ReactQuill from 'react-quill';
import ImageUploading from 'react-images-uploading';

import 'react-quill/dist/quill.snow.css';
import '../assets/pagesCSS/post.css';

import {postBlog} from '../API/postapi'
import Table from '../components/table/Table';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';

const Alert=React.forwardRef( function Alert(props,ref)
{
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>
})
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  bgcolor: 'background.paper',
  border: '2px solid #62b4ff',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
const customerTableHead = [
    'ID',
    'TITLE',
    'DESCRIPTION',
    'DATE',
    'ACTION'
]

const renderHead = (item, index) =><><th key={index}>{item}</th></> 

const Post = (props) => {

const [posts, setPosts] = useState([]); 
const [value, setValue] = useState('');
const [images, setImages] = useState([]);
const [imagesEdit, setImagesEdit] = useState([]);
const [title , setTitle]=useState('');

const [PostmodalIsOpen, setPostIsOpen] = useState(false);
const [EditmodalIsOpen, setEditIsOpen] = useState(false);
const [attachedModalIsOpen, setAttachedIsOpen]= useState(false);
const [SuccessAlertIsOpen, setSuccessAlertIsOpen] = useState(false);
const [DeleteAlertIsOpen, setDeleteAlertIsOpen] = useState(false);

const [uploadedSuccesfully,setUploadedSuccesfully]=useState(false);
const [updatedSuccesfully,setUpdatedSuccesfully]= useState(false);
const [deletedSuccesfully,setDeletedSuccesfully]=useState(false);
const [imageDeleteSuccesfully,setImageDeleteSuccesfully]=useState(false);



const [editPostData, setEditPostData]=useState({
  id:'',
  title:'',
  description:'',
  image:[]
})


  useEffect( ()=>{
     
    const fetchData=async()=>
    {
      await  axios.get(
        ` http://localhost:3001/post`).then((res)=>
            {setPosts(res.data.posts); 
              console.log(res)
             })
    }
    fetchData();
  
 

    },[uploadedSuccesfully,deletedSuccesfully,updatedSuccesfully,imageDeleteSuccesfully]);

 
const maxNumber = 69;//maximum image upload

const setImage = (imageList) => {setImages(imageList);};
const setImageEdit=(imageList)=>{setImagesEdit(imageList)};
const resetImageUpload=()=>{setImages([])};
const resetImageEdit=()=>{setImagesEdit([])};

const handleOpenPostAdd = () => {setPostIsOpen(true);};
const handleClosePostAdd = () => {setPostIsOpen(false);};
const handleOpenEditPost = () => {setEditIsOpen(true);};
const handleCloseEditPost = () => {setEditIsOpen(false);};
const handleopenAttached=()=> { setAttachedIsOpen(true); }
const handleCloseAttached=()=> { setAttachedIsOpen(false);}
const handleOpenSuccessAlert = () => {setSuccessAlertIsOpen(true);};
const handleCloseSuccessAlert=(event,reason)=>
{
  if(reason === 'clickaway')
  {
    return;
  }
  setSuccessAlertIsOpen(false)
}
const handleOpenDeleteAlert=()=>{setDeleteAlertIsOpen(true)};
const handleCloseDeleteAlert=(event,reason)=>
{
  if(reason === 'clickaway')
  {
    return;
  }
  setDeleteAlertIsOpen(false)
}

function fetchItemData(id)
{
  console.log(posts)
  console.log(id)
  {posts.filter(post => post.id === id).map(res =>
    {
      setEditPostData({...editPostData ,id: res.id, title: res.title, description: res.description,image:res.postimage})
    })}

}
  
async function UploadPost(){
    
    setUploadedSuccesfully(false);

    const formData = new FormData();  
    formData.append('title',title);
    formData.append('value',value);

    for (let i = 0; i < images.length; i++) {
        formData.append('files', images[i].file);                      
      }

    try {
      const res = await axios.post(`http://localhost:3001/post/add`,formData);
      console.log(res);
      setUploadedSuccesfully(true);
      handleOpenSuccessAlert();
      resetImageUpload();
      handleClosePostAdd();
      setValue('')
      
    } catch (ex) {
      console.log(ex);
      
    }
  };
async function EditPost()
  {
  
    setUpdatedSuccesfully(false)
    const formData = new FormData();  
    formData.append('title',editPostData.title);
    formData.append('description',editPostData.description);
    const id=editPostData.id;
    console.log(id)

    for (let i = 0; i < imagesEdit.length; i++) {
        formData.append('files', imagesEdit[i].file);       
      }

    try {
      await axios.put(`http://localhost:3001/post/update/${id}`,formData).then((res)=>
      {
        setUpdatedSuccesfully(true);
        console.log(res.data.success);
        if(res.data.success)
          {
            axios.get(`http://localhost:3001/post`).then((newpost)=>
                  {
                    console.log(newpost);
                    var unfilteredPost= newpost.data.posts;

                    {unfilteredPost.filter(unfilteredPost => unfilteredPost.id === id).map(res =>
                      {
                        setEditPostData({...editPostData ,id: res.id, title: res.title, description: res.description,image:res.postimage}) 
                      })
                    }
                  }
                  )
                  resetImageEdit();
          }
          else
          {
            console.log(res.data.message)
          }
        
      })
    } catch (ex) {
      console.log(ex);
    }
  } 
function  deletePost(id) {

    setDeletedSuccesfully(false)

    try{ 
      axios.delete( `http://localhost:3001/post/delete/${id}`).then((res)=>
      {
        setDeletedSuccesfully(true);
        handleOpenDeleteAlert();
      })
     } catch (ex) {
       console.log(ex);
     }
  
    }
async function delteImage(item)
{

  setImageDeleteSuccesfully(false);
  const formData = new FormData();  
  formData.append('imageName',item.image);

  try{ 
    await axios.delete( `http://localhost:3001/image/delete/${item.id}`,{data : item}).then((res)=>
    {
      setImageDeleteSuccesfully(true);
      if(res.data.success)
      {
          console.log(item)
         axios.get(
          ` http://localhost:3001/post`).then((newpost)=>
              {
                var unfilteredPost= newpost.data.posts;

                console.log(unfilteredPost)
                console.log(item)

                {unfilteredPost.filter(unfilteredPost => unfilteredPost.id === item.postId).map(res =>
                  {
                    setEditPostData({...editPostData ,id: res.id, title: res.title, description: res.description,image:res.postimage})
                    
                  })
                }
               }
               )
      }
      else
      {
        console.log(res.data.message)
      }
    })
   } catch (ex) {
     console.log(ex);
   }
}

  return (
    <div>
      <Stack sx={{width:"50%"}} spacing={2}>
         <Snackbar open={SuccessAlertIsOpen} 
                   autoHideDuration={6000}
                   onClose={handleCloseSuccessAlert}
                   anchorOrigin={{vertical : "top" , horizontal : "right"}}
                   >
             <Alert onClose={handleCloseSuccessAlert} severity="success" sx={{width:'100%'}}>
                  The is the success message
             </Alert>
         </Snackbar>
      </Stack>
      <Stack sx={{width:"50%"}} spacing={2}>
         <Snackbar open={DeleteAlertIsOpen} 
                   autoHideDuration={6000}
                   onClose={handleCloseDeleteAlert}
                   anchorOrigin={{vertical : "top" , horizontal : "right"}}
                   >
             <Alert onClose={handleCloseDeleteAlert} severity="error" sx={{width:'100%'}}>
                  The is the delete message
             </Alert>
         </Snackbar>
      </Stack>
        
      <button className="addpost" onClick={handleOpenPostAdd}>Add new post</button>

      <div>
         <h2 className="page-header">
           Post
         </h2>

       <div className="row ">
         <div className="col-12">
            <div className="card_body">
                 <Table
                      limit='11'
                      headData={customerTableHead}
                      bodyData={posts}
                      renderHead={(item, index) => renderHead(item, index)}
                      
                      renderBody={(item, index) => 
                        <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        {/* <td>{item.description}</td> */}
                        <td>{item.createdAt}</td>
                        <td><button className='editButton' onClick={()=>
                          {
                            handleOpenEditPost()
                            fetchItemData(item.id)
                            }}>Edit</button></td>
                        <td><button className='deletButton'onClick={()=>deletePost(item.id)}>Delete</button></td>
                        <td><button className='deletButton' onClick={()=>
                                                           {handleopenAttached()
                                                             fetchItemData(item.id)}}>Attached</button></td>
                        
                      
                    </tr>}
                  />
            </div>
         </div>
       </div>
    </div>



    <Modal
        open={PostmodalIsOpen}
        hideBackdrop
        onClose={handleClosePostAdd}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style}}>

        <button className='closebutton'><i onClick={handleClosePostAdd} class='bx bx-x-circle'></i></button>
                    <div className='postcontent'>
                <h2 className="page-header">
                    Post
                </h2>
                <div className="row">
                    <div className="col-8">
                                
                                < input type='text' className='title'  onChange={(e)=>
                                {
                                    setTitle(e.target.value)
                                }} placeholder='Title' />
                                
                                <div className="contentEditor">
                                <ReactQuill  className="editor" theme="snow" modules={modules}  value={value} onChange={setValue} />
                                </div>
                            </div>
                     <div className='imageupload col-4 '>
                       <div className="App">
                        <ImageUploading
                        multiple
                        value={images}
                        onChange={setImage}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                        >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) => (
                            
                            <div className="upload__image-wrapper">
                            <button
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Upload Image 
                            </button>
                            &nbsp;
                            <button onClick={onImageRemoveAll}>Remove all images</button>
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageUpdate(index)}>Update</button>
                                    <button onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                                </div>
                            ))}
                            </div>
                        )}
                        </ImageUploading>
                    </div>
                    </div>
                    </div>
                    <div className="EButton">
                    <button  onClick={UploadPost}>upload</button>
                    </div>
                    <div>{postBlog}</div>
                    
                
                </div>
        
        </Box>
    </Modal>

    <Modal
        open={EditmodalIsOpen}
        hideBackdrop
        onClose={handleCloseEditPost}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style}}>

        <button className='closebutton'><i onClick={()=>{handleCloseEditPost();setImagesEdit=[];}} 
                class='bx bx-x-circle'></i></button>
                    <div className='postcontent'>
                <h2 className="page-header">
                    Edit Post
                </h2>
                <div className="row">
                    <div className="col-8">
                            < input type='text' 
                               className='title' 
                               value={editPostData.title}  
                                      onChange={(e)=>
                                        {
                                          setEditPostData({...editPostData , title: e.target.value})
                                        }} placeholder='Title' 
                                />
                                <div className="contentEditor">
                                <ReactQuill  className="editor" 
                                             theme="snow" 
                                             modules={modules}  
                                             value={editPostData.description} 
                                             onChange={(content, editor)=> {
                                              setEditPostData({...editPostData , description: content})
                                             }}
                                           
                                              />
                                </div>
                            </div>
                    <div className='imageupload col-4'>
                      <div className="App">
                        <ImageUploading
                        multiple
                        value={imagesEdit}
                        onChange={setImageEdit}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                        >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) => (
                            
                            <div className="upload__image-wrapper">
                            <button className='addButton'
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Upload New Image 
                            </button>
                            &nbsp;
                            <button className='deletButton' onClick={onImageRemoveAll}>Remove all images</button>
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                <img src={image['data_url']} alt="" width="150" />
                                <div className="image-item__btn-wrapper">
                                    <button className='editButton' onClick={() => onImageUpdate(index)}>Update</button>
                                    <button className='deletButton' onClick={() => onImageRemove(index)}>Remove</button>
                                </div>
                                </div>
                            ))}
                                 
                  
                               <label className='label'>Added Images</label>
                               
                              {
                                editPostData.image.length > 0 ?
                                (
                                     <div className="uploadedImages">
                                         {
                                          editPostData.image.map((item,index)=>
                                          {
                                            return (<>
                                                   <img src={`http://localhost:3001/images/${item.image}`} 
                                                   className="img-fluid" 
                                                   alt="" width="150"/> 
                                                   <button className='deletButton' onClick={()=>
                                                  {
                                                      delteImage(item)
                                                  }}>Remove</button>
                                                   <br/>
                                            </>
                                           
                                            )
                                          
                                          }    
                                        )
                                      }
                                     </div>
                                ): ""}

                            </div>
                        )}
                        </ImageUploading>
                    </div>
                    </div>
                    </div>
                    <div className="EButton">
                    <button  onClick={EditPost}>update</button>
                    </div>
                    <div>{postBlog}</div>
                    
                
                </div>

        </Box>
    </Modal> 

    <Modal
        open={attachedModalIsOpen}
        hideBackdrop
        onClose={handleClosePostAdd}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style}}>
              <div className='attached'>
              <button className='closebutton'><i onClick={handleCloseAttached} class='bx bx-x-circle'></i></button>
              <div className='single'>
                <div className='content'>
                  <div className='imageHolder'>
                    {console.log(editPostData)}
                    {editPostData.image.length > 0 ? (
                      <div className='container'>
                        <div className='row justify-content-md-center'>
                        {editPostData.image.map((item)=>
                          {
                           return  (<>
                           {editPostData.image.length == 1 ? (<>     
                           <img src={`http://localhost:3001/images/${item.image}`} 
                           className="img-fluid contentImage" 
                           alt="" width="400"/></>) : 
                           (   <>
                           {editPostData.image.length ==2 ? (
                            
                              <div className='col col-lg-6 col-sm-12'>
                                <img src={`http://localhost:3001/images/${item.image}`} 
                                  className="img-fluid contentImage" 
                                  alt=""/>
                              </div>
                           ): 
                           (
                            <>
                             <div className='col col-lg-6 col-sm-12'>
                              <div className='col col-lg-6 col-sm-12'>

                              </div>
                              {editPostData.image.length ==3 ? 
                              (<></>)
                              :
                              (<></>)}
                             </div>
                            </>
                              
                           )}
                            
                             </>)}
                          
                          </>)
                          })}

                        </div>
                
                      
                      </div>
                       
                    ): ""}  
                  </div>
                
                    <div className='Contentinfo' dangerouslySetInnerHTML={{__html: editPostData.description}}>  
                    </div>
                    <div>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid omnis est delectus sit cupiditate corporis, facere non ab voluptates accusantium, libero perspiciatis excepturi placeat eaque animi accusamus ipsam. Aliquam, non!</p>
                    </div>
                </div>
              </div>
              </div>
        </Box>
    </Modal> 


    </div>
  )
}

export default Post
