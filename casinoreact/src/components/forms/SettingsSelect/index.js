import React from 'react'
import { useState } from 'react'
import { Label, Option, OptionIcon, Options, OptionText, Select, SelectIcon, SelectLabel, Wrapper } from './styles'

const SettingsSelect = ({ title, options }) => {

    const [value, setValue] = useState();
    const [renderOptions, setRenderOptions] = useState(false);

  return (
    <Wrapper>
        <Label>Select {title}</Label>
        <Select onClick={() => setRenderOptions(!renderOptions)}>
            <SelectLabel>Select {title}...</SelectLabel>
            <SelectIcon src="assets/icons/arrowSelect.png" />
        </Select>
        <Options open={renderOptions}>
            {options.map((option, i) => {
                const active = (value === option.value);
                return <Option active={active} onClick={() => setValue(option.value)} key={i}>
                    <OptionText active={active}>{option.emoji} 	&nbsp; {option.name}</OptionText>
                    <OptionIcon src="assets/icons/tick.png" active={active} />
                </Option>
            })}
        </Options>
    </Wrapper>
  )
}

export default SettingsSelect