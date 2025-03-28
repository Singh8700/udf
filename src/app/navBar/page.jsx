"use client"
import styled from "styled-components"
import Link from 'next/link';
import {usePathname } from 'next/navigation';
import { AiFillHome } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { TbCategoryPlus } from "react-icons/tb";
import { FaCartArrowDown } from "react-icons/fa6";
import {motion} from 'framer-motion';
import { useCart } from '../../context/CartContext.jsx';

const NavbarSection = () => {
    const pathname = usePathname();
    const { cartItems } = useCart();
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    const navText = [
        {title : "home", path : "/", icon: <AiFillHome/> },
        {title : "Categories", path : "/categories/", icon: <TbCategoryPlus/> },
        {title : "Carts", path : "/cart/", icon: <><FaCartArrowDown/>{totalItems > 0 && <span style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            background: '#6366f1',
            color: 'white',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>{totalItems}</span>}</> },
        {title : "Account", path : "/account/", icon: <BsFillPersonFill/> }
    ];

    return (
        <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
        >
            <NavSection>
                <ListContent>
                    {navText.map((text, index) => (
                        <Li key={index}>
                            <Eleme>
                                <Link href={text.path}>
                                    <span 
                                        className={`
                                        ${pathname === text.path ? "active" : ""}
                                        icon`}>{text.icon}</span>
                                    <span 
                                        className={`
                                        ${pathname === text.path ? "textActive" : ""}  
                                        text`}>{text.title}</span>
                                </Link>
                            </Eleme>
                        </Li>
                    ))}
                </ListContent>
            </NavSection>
        </motion.div>
    );
}

export default NavbarSection

const NavSection = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 25px;
    z-index: 999;
    left: 50%;
    backdrop-filter: blur(10px);
    transform: translate(-50%, -30%);
    border-radius: 25px;
    width: 400px;
    height: 75px;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    @media(max-width:780px){
    width:350px;
    padding: 0 10px;
    }
`
const ListContent = styled.ul`
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 20px;
        width: 100%;
        text-transform: capitalize;
        padding: 0 10px;
    `
const Li = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    // background: red;
    position: relative;
    // overflow-x: hidden;
    transition: all 0.3s ease-in-out;
    a{
        width: 100%;
        position: relative;
        z-index: 99;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: auto;
        .icon {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            color: var(--foreground);
            text-align: center;
            position: relative;
            z-index: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding-bottom: 20px;

            svg {
                position: relative;
                z-index: 2;
            }

            &::after {
                content: "";
                position: absolute;
                width: 75%;
                height: 75%;
                top: 50%;
                left: 50%;
                opacity: 0;
                box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
                border-radius: 50%;
                background-color: #fff;
                z-index: 1;
                transform: translate(-50%, -50%) scale(1);
                transition: all 0.3s ease-in-out;
            }
        }

        .active {
            width: 45px;
            height: 45px;
            color: var(--background);
            opacity: 1;
            background: rgba(${()=>  Math.random() * 255},${()=>  Math.random() * 255},${()=>  Math.random() * 255},${()=>  Math.random() * 0.9});
            color: black;
            display: flex;
            font-size: 25px;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding-bottom: 0;
            overflow: hidden;
            position: relative;
            z-index: 9;
            box-shadow: 0 8px 10px rgba(0, 0, 0, 0.5);
            transform: translate(0px, -30px);
            transition: transform 0.3s linear;

            &::after {
                opacity: 1;
            }
        }

        .text {
            color: var(--foreground);
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin-top: -15px;
            transform: translate(0px, 20px);
            
            &::after {
                content: "";
                position: absolute;
                width: 8px;
                height: 8px;
                bottom: -40%;
                border-radius: 50%;
                // background: red;
                z-index: 0;
                left: 40%;
                transform: scale(0);
                // transition: all 0.3s ease-in-out;
            }
        }

        .textActive {
            transform: translate(0px, -10px);
            position: relative;
            font-weight: 700;
            font-size: 18px;
            transition: all 0.3s ease-in-out;

            &::after {
                content: "";
                position: absolute;
                width: 5px;
                height: 6px;
                bottom: -40%;
                border-radius: 50%;
                background: green;
                z-index: 0;
                left: 40%;
                box-shadow: 1px 1px 5px rgba(0, 0, 0, 1);
                transform: scale(1);
                transition: transform 0.3s ease-in-out;
            }
        }
    }
`
const Eleme = styled.a`
        position: relative;
        z-index: 1;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: auto;
        
    }
    `
    const CartBadge = styled(motion.span)`{
    position: absolute;
    bottom: 5px;
    right: 5px;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}
`;