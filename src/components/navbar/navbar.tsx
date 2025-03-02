"use client";
import React, { useEffect, useState } from "react";
import Cart from "./cart";
import FullscreenLayout from "../layout/fullscreenLayout";
import CartModal from "./cart-modal";
import { useAppSelector } from "@/lib/hooks";
import { signOut, useSession } from "next-auth/react";
import LoginForm from "../login/login-form";
import RegisterForm from "../login/register-form";
import Link from "next/link";

const Navbar = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const products = useAppSelector((state) => state.cart.products);
  const { data: session } = useSession();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    setIsLogged(session ? true : false);
  }, [session]);

  useEffect(() => {
    if (showCart) {
      if (products.length === 0) {
        setShowAlert(true);
        setShowCart(false);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      }
    }
  }, [showCart]);

  function openLoginForm() {
    if (document && document.getElementById("login_modal")) {
      const element: any = document.getElementById("login_modal");
      element.showModal();
    }
  }

  async function logout() {
    await signOut();
  }

  function openRegisterForm() {
    if (document && document.getElementById("register_modal")) {
      const element: any = document.getElementById("register_modal");
      element.showModal();
    }
  }

  return (
    <div className="navbar">
      <div className="flex-1">
        <Link href="/home">
          <button className="btn btn-ghost text-xl">BeMark</button>
        </Link>
      </div>
      {isLogged && (
        <div className="w-full justify-center">
          <Link href={`/products/profile/${session?.user?.id}`}>
            <button className="btn btn-primary btn-outline mr-4">
              Your Products
            </button>
          </Link>
          <Link href={`/products/${session?.user?.id}`}>
            <button className="btn btn-primary btn-outline mr-4">
              History
            </button>
          </Link>
        </div>
      )}
      <Cart openCart={setShowCart} products={products} />
      <div className="flex-none px-4">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button
                className={`btn ${isLogged ? "btn-primary" : "btn-primary"}`}
                onClick={() => {
                  isLogged ? logout() : openLoginForm();
                }}
              >
                {isLogged ? "Logout" : "Login"}
              </button>
              {!isLogged && (
                <button
                  className={`btn mt-2 btn-secondary text-white`}
                  onClick={() => {
                    openRegisterForm();
                  }}
                >
                  Register
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
      <LoginForm />
      <RegisterForm />
      {showCart && products.length > 0 && (
        <FullscreenLayout closeModal={setShowCart}>
          <CartModal products={products} />
        </FullscreenLayout>
      )}
    </div>
  );
};

export default Navbar;
