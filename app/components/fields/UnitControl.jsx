import {
    FormLayout,
    TextField,
    Select,
    InlineError,
    Link,
    Text
} from '@shopify/polaris';
  import {useState, useCallback, useEffect} from 'react';
import { extractNumberAndUnit } from '../../utils';
  
  function UnitControl({onChange = () => {}, value, label}) {
    const [number, setNumber] = useState('12');
    const [unit, setUnit] = useState('');
  
    const handleWeightChange = useCallback(
      (value) => setNumber(value),
      [],
    );
    const handleUnitChange = useCallback((value) => setUnit(value), []);

    useEffect(() => {
        onChange(number + unit)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [number, unit])

    useEffect(() => {
        const {number = 100, unit = '%'} = extractNumberAndUnit(value);
        setNumber(number);
        setUnit(unit);
    }, [value])
  
    const unitSelectID = 'unit';
    const errorMessage = generateErrorMessage();
    return (
      <>
          <FormLayout.Group condensed>
            <TextField
              label={label}
              type="number"
              value={number}
              onChange={handleWeightChange}
              error={Boolean(!number && unit)}
              autoComplete="off"
            />
            <Select
              id={unitSelectID}
              label="Unit"
              placeholder="Select"
              options={['%', 'px', 'rem', 'em']}
              value={unit}
              onChange={handleUnitChange}
              error={Boolean(!unit && number)}
            />
          </FormLayout.Group>
        <InlineError message={errorMessage} fieldID={unitSelectID} />
      </>
    );

  
    function generateErrorMessage() {
      const numberError =
        !number && unit ? 'The numeric value' : '';
      const unitError =
        !unit && number ? 'The unit of measure' : '';
  
      if (!numberError && !unitError) {
        return '';
      }
  
      return (
        <span>
          <Text tone="critical" as="span">
            <p>
              {`${numberError}${unitError} is required `}
              <Link>Manage shipping</Link>
            </p>
          </Text>
        </span>
      );
    }
  }

  export default UnitControl