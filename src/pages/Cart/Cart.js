import "./style.css"
import {CartContext} from "../../context/CartContext";
import { useContext , useState } from "react";
import ItemCartList from "../../Components/ItemCartList/ItemCartList";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getFirestore, doc, updateDoc} from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const Cart = () => {
  const {cart, clear, total} = useContext(CartContext)

  const navigate = useNavigate()

  const [abrirFormulario, setAbrirFormulario ] = useState(false)
  const [nuevoCliente, setNuevoCliente] = useState(false)


  const [formValue, setFormValue] = useState({
    name: '',
    phone: '',
    email: '',
  })

  let styleClearAll = {
    display:"flex",
    flexDirection: "column-reverse",
    justifyContent: "space-between",
    padding:"20px"
  }  


  const createOrder = (event) => {
    event.preventDefault();
    const db = getFirestore();
    const querySnapshot = collection(db, 'orders');

    addDoc(querySnapshot, {
      buyer: {
        email: formValue.email,
        name: formValue.name,
        phone: formValue.phone,
      },
      products: cart.map((product) => {
        return {
          name: product.name,
          price: product.price,
          id: product.id,
          quantity: product.quantity
        }
      }),
      total: total,
    })
    .then(() => {
      updateStocks(db)
    })
    .catch((err) => console.log(err))
    setAbrirFormulario(false)
    setNuevoCliente(true)
    clear([])
  };

  const updateStocks = (db) => {
    cart.forEach((product) => {
      const querySnapshot = doc(db, 'products', product.id);

      updateDoc(querySnapshot, {
        stock: product.stock - product.quantity,
      })
      .catch((err) => console.log(err))
    })
  }
  const handleInput = (event) => {
    setFormValue({...formValue, 
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div className="CartContainer">
      <h1 className="tituloCart">Cart</h1>
      {cart.length === 0 && !nuevoCliente && <div>
        <h2>There is nothing in the cart!!!</h2>
        <button className="botonAllClothes" onClick={() => navigate('/allclothes')}>
          <div className="default-btn">
            <svg className="css-i6dzq1" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth="2" stroke="#FFF" height="20" width="20" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle r="3" cy="12" cx="12"></circle></svg>
            <span>Go Shopping</span>
          </div>
          <div className="hover-btn">
            <svg className="css-i6dzq1" strokeLinejoin="round" strokeLinecap="round" fill="none" strokeWidth="2" stroke="#ffd300" height="20" width="20" viewBox="0 0 24 24"><circle r="1" cy="21" cx="9"></circle><circle r="1" cy="21" cx="20"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span>Shop Now</span>
          </div>
        </button>
        </div>}
      {cart.length > 0  && <div>
          <ItemCartList/>
          <div style={styleClearAll}>
            <button className="clearAll" onClick={() => clear([])} variant="secondary" size="lg" >Clear all cart</button>
            <h3>{`Total price: ${total}$`}</h3>
            <button onClick={() => setAbrirFormulario(true)}>Completar compra</button>
          </div>

          {abrirFormulario && <div>
          <Form className="formularioBootstrap">
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="Enter email" value={formValue.email} onChange={handleInput} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="name" placeholder="Name" value={formValue.name} onChange={handleInput} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control name="phone" type="phone" placeholder="Phone" value={formValue.phone} onChange={handleInput} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Accept all terms" />
            </Form.Group>
            <Button onClick={ createOrder  } variant="primary">
              Buy
            </Button>
          </Form>
          </div>}
          
        </div>}
      {nuevoCliente && <div style={{width:"70%", backgroundColor:"white", padding:"20px"}}>
        <h1>Thank you for purchasing our products, an email will soon be arriving in your mailbox, where you can see the status of your purchase.</h1>
        <Alert variant={'success'}>
          Your purchase has been stored correctly !
        </Alert>
        </div>}
    </div>
  )
}

export default Cart