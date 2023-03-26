import React ,{useState} from 'react'
// import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import ImageUploading from 'react-images-uploading';
import {postBlog} from '../API/postapi'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import 'react-quill/dist/quill.snow.css';
import '../assets/pagesCSS/post.css';
import Table from '../components/table/Table'
import customerList from '../assets/JsonData/customers-list.json';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #62b4ff',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



const customerTableHead = [
  '',
  'name',
  'email',
  'comment'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
  
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td><textarea id="w3review" name="w3review" rows="4" cols="70">
             {item.location}
            </textarea>
        </td>
        <td><button className='editButton'>edit</button></td>
        <td><button className='deletButton'>delete</button></td>
        
      
    </tr>
)

const AddAdds = () => {

  
const [value, setValue] = useState('');
const [images, setImages] = useState([]);
const [title , setTitle]=useState('');

const [open, setOpen] = useState(false);
const handleOpen = () => {
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
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

 
  const maxNumber = 69;//maximum image upload
  const setImage = (imageList) => {
    setImages(imageList);
  };

  

  const uploadImage=()=>
  {
    console.log("images" + images)
    console.log("title" + title)
  }

  let subtitle;
 

  return (
    <div>
        
      <button className="addpost" onClick={handleOpen}>Add new Adds</button>

      <div>
       <h2 className="page-header">
         Adds
       </h2>
       
       <div className="row">
         <div className="col-12">
            <div className="card_body">
                 <Table
                      limit='11'
                      headData={customerTableHead}
                      renderHead={(item, index) => renderHead(item, index)}
                      bodyData={customerList}
                      renderBody={(item, index) => renderBody(item, index)}
                  />
            </div>
         </div>
       </div>
    </div>
      <Modal
        open={open}
        hideBackdrop
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style}}>
         
        <button className='closebutton'><i onClick={handleClose} class='bx bx-x-circle'></i></button>
        <div className='postcontent'>
       <h2 className="page-header">
         Adds
       </h2>
       <div className="row">
         <div className="col-8">
           <input type='text' className='title'  onChange={(e)=>
               {
                 setTitle(e.target.value)
               }} placeholder='Title' />
                    
          <div className="contentEditor">
                  <ReactQuill  className="editor" theme="snow" modules={modules}  value={value} onChange={setValue} />
           </div>
           </div>
           <div className='col-4'>
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
           <button  onClick={uploadImage}>upload</button>
        </div>
        <div>{postBlog}</div>
        
      
    </div>
         
        </Box>
      </Modal>
    
      {/* <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
    
        <button className='closebutton'><i onClick={closeModal} class='bx bx-x-circle'></i></button>
        <div className='postcontent'>
       <h2 className="page-header">
         Adds
       </h2>
       <div className="row">
         <div className="col-8">
                    
                      <input type='text' className='title'  onChange={(e)=>
                      {
                        setTitle(e.target.value)
                      }} placeholder='Title' />
                    
                    <div className="contentEditor">
                      <ReactQuill  className="editor" theme="snow" modules={modules}  value={value} onChange={setValue} />
                    </div>
                </div>
                <div className='col-4'>
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
           <button  onClick={uploadImage}>upload</button>
        </div>
        <div>{postBlog}</div>
        
      
    </div>
      </Modal> */}
    
    </div>
  )
}

export default AddAdds;
