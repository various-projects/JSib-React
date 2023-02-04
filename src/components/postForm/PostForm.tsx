import { useState } from "react";
import Styles from "./PostForm.module.css";


//TODO: handle file input
//TODO: handle form posting
//TODO: receive additional params (current path, etc).
export const PostForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    return (
        <form className={Styles['post-form']} action="post.php" method="POST">
            <table style={{ maxWidth: "50%", minWidth: "300px", margin: "0 auto" }}>
                <col /><col width="99%" />
                <tr>
                    <td>E-mail:</td>
                    <td><input name="email" value={email} onChange={event => setEmail(event.target.value)}  /></td>
                </tr>
                <tr>
                    <td>Name:</td>
                    <td><input name="name" value={name} onChange={event => setName(event.target.value)} /></td>
                </tr>
                <tr>
                    <td>Title:</td>
                    <td><input name="title" value={title} onChange={event => setTitle(event.target.value)} /></td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <textarea name="text" style={{ height: "100px" }}  value={text} onChange={event => setText(event.target.value)} ></textarea>
                        <br />Hint: **<b>bold</b>**, *<i>italic</i>*, __<u>underline</u>__,
                        [s]<s>strike-through</s>[/s], %%<span className="spoiler">spoiler</span>%%
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}> <input name="file" type="file" style={{ width: "100%" }} /></td>
                </tr>
                <tr><td colSpan={2}><input id="postSendSubmit" type="submit" value="Post-It!" /></td></tr>
            </table>
        </form>
    );
}