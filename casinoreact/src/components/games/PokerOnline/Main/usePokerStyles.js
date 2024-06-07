import { styleCollector , useStyles } from "trousers"

const tableStyles = props => styleCollector("table")
    .element`
    
    `


const containerStyles = props => styleCollector("container")
    .element`

    `

const usePokerStyles = props => {

    /* return {
        sidebar  : useStyles(blockStyles(props)),
        sidebar__logoContainer : useStyles(sidebarLogoContainer(props)),
        sidebar__logo : useStyles(sidebarLogo(props)),
        sidebar__logoBig : useStyles(sidebarLogoBig(props)),
        sidebar__logoSmall : useStyles(sidebarLogoSmall(props)),
        sidebar__toggler : useStyles(sidebarToggler(props))
    } */
    return {
        table : useStyles(tableStyles(props)),
        container : useStyles(containerStyles(props))
    }
}

export default usePokerStyles