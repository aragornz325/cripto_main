import React, { useEffect, useState } from "react";
import { Div, Title , Paragraph, Wrapper } from "./styles";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SimpleAccordion() {
  return (
    <Wrapper>
      <Div id='about'>
          <h1 style={{textAlign: 'center', color: '#FFFFFF', marginBottom: '30px'}}>About </h1>
        <Accordion style={{backgroundColor : '#212121',  border: 'none', boxShadow: 'none'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{'color': '#FFFFFF', ':focus': {'color': 'gold'},  'border': 'none'}}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Title>Are the games provably fair? </Title>
          </AccordionSummary>
          <AccordionDetails style={{ 'border': 'none'}}>
            <Paragraph  >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
       </Paragraph>

          </AccordionDetails>
        </Accordion>
        <Accordion style={{backgroundColor : '#212121',  border: 'none', boxShadow: 'none'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{'color': '#FFFFFF',  'border': 'none'}}/>}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Title>The game is stuck, what do I do?</Title>
          </AccordionSummary>
          <AccordionDetails>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Paragraph>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{backgroundColor : '#212121',  border: 'none', boxShadow: 'none'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{'color': '#FFFFFF', ':focus': {'color': 'gold'}}}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Title>How do Bitcoin transactions work?</Title>
          </AccordionSummary>
          <AccordionDetails>
            <Paragraph >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Paragraph>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{backgroundColor : '#212121',  border: 'none', boxShadow: 'none'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{'color': '#FFFFFF', ':focus': {'color': 'gold'}}}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Title >How to purchase bitcoins and deposit via Utorg?</Title>
          </AccordionSummary>
          <AccordionDetails>
              <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Paragraph>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{backgroundColor : '#212121',  border: 'none', boxShadow: 'none'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{'color': '#FFFFFF', ':focus': {'color': 'gold'}}}/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Title>Can I change my username / email? </Title>
          </AccordionSummary>
          <AccordionDetails>
            <Paragraph  >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Paragraph>
          </AccordionDetails>
        </Accordion>
      </Div>
    </Wrapper>
  );
}