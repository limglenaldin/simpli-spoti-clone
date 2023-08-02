// Third-party Libraries
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const toaster = (type, message) => {
  const toastOption = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }
  
  switch (type) {
    case 'success':
      toast.success(`${message}`, toastOption);
      break;
    case 'info':
      toast.info(`${message}`, toastOption);
      break;
    case 'warning':
      toast.warn(`${message}`, toastOption);
      break;
    case 'error':
      toast.error(`${message}`, toastOption);
      break;
    default:
      toast(`${message}`, toastOption);
      break;
  }
}

export { toaster }