import { useContext } from 'react'
import {VscGithubInverted} from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth'
import styles from './styles.module.scss'


export function LoginBox() {

    const {signInUrl} = useContext(AuthContext)


    return (
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compertilhe a sua mensagem</strong>
            <a href="#" className={styles.signInWithGithub}>
                <VscGithubInverted size={24} />
                Entrar com o github
            </a>
        </div>
        )
}