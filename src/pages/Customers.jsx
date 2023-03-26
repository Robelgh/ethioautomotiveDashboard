import React ,{useState} from 'react'
// import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import ImageUploading from 'react-images-uploading';
import {postBlog} from '../API/postapi'
import 'react-quill/dist/quill.snow.css';
import '../assets/pagesCSS/post.css';
import Table from '../components/table/Table'
import customerList from '../assets/JsonData/customers-list.json';


const customerTableHead = [
  '',
  'name',
  'email',
  'phone',
  'total orders',
  'total spend',
  'location'
]

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


const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.total_orders}</td>
        <td>{item.total_spend}</td>
        <td>{item.location}</td>
    </tr>
)

const Customers = () => {

  
const [value, setValue] = useState('');
const [images, setImages] = useState([]);
const [title , setTitle]=useState('');

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
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
        <div>
      <button onClick={openModal}>Open Modal</button>
      {/* <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div className='postcontent'>
       <h2 className="page-header">
         Post
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
    </div>
  )
}

export default Customers
