import {  styled } from "@mui/material";


export const Box = styled('div')`
padding: 50px 60px;
background: black;
width: 100%;
@media (max-width: 1000px) {
	padding: 70px 30px;
}
`;

export const Container = styled('div')`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1000px;
	margin: 0 auto;
`

export const Column = styled('div')`
display: flex;
flex-direction: column;
text-align: left;
margin-left: 60px;
`;

export const Row = styled('div')`
display: grid;
grid-template-columns: repeat(auto-fill,
						minmax(185px, 1fr));
grid-gap: 20px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const FooterLink = styled('a')`
color: #000000;
margin-bottom: 20px;
font-size: 14px;
text-decoration: none;
letter-spacing: 3px;
display: block;
&:hover {
	color: grey;
	transition: 200ms ease-in;
}
`;

export const Heading = styled('p')`
font-size: 18px;
color: #000000;
font-weight: 500;
margin-bottom: 30px;
letter-spacing: 3px;
border-bottom: 1px solid;
display: inline-block;
line-height: 2.5;
@media (max-width: 900px) {
	margin-bottom: 15px;
}
`;
