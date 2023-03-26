import React ,{useState,useEffect} from 'react'
// import Modal from 'react-modal';
import ReactQuill from 'react-quill';
import ImageUploading from 'react-images-uploading';
import {postBlog} from '../../API/postapi'
import 'react-quill/dist/quill.snow.css';
import '../../assets/pagesCSS/post.css';


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


const PostModal = (props) => {

    const [value, setValue] = useState('');
    const [images, setImages] = useState([]);
    const [title , setTitle]=useState('');
    const [modalIsOpen, setIsOpen] = React.useState(false);

    useEffect( ()=>{
        
      
            setIsOpen(props.openpermit);
          

    } , [props.openpermit] )
    
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
     
    
  
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        setIsOpen(false);
      }
  
  
   console.log(props.openpermit)


  return (
    <div>

               </div>
  )
}

export default PostModal
