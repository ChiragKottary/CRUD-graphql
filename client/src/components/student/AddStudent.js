import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { gql, useMutation } from '@apollo/client';

const ADD_STUDENT = gql`
  mutation addStudent(
    $studentnumber: String!,
    $firstname: String!,
    $lastname: String!,
    $email: String!,
    $phone: String!,
    $password: String!,
    $city: String!,
    $address: String!,
    $program: String!,
  ) {
    addStudent(
      studentnumber: $studentnumber,
      firstname: $firstname,
      lastname: $lastname,
      email: $email,
      phone: $phone,
      password: $password,
      city: $city,
      address: $address,
      program: $program,
    ) {
      studentnumber
      firstname
      lastname
      email
      phone
      city
      address
      program
    }
  }
`;

const AddStudent = () => {


  
	const [studentnumber, setstudentnumber] = useState('');
	const [firstname, setfirstname] = useState('');
	const [lastname, setlastname] = useState('');
	const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
    const [password, setpassword] = useState('');
  const [city, setcity] = useState('');
  const [address, setaddress] = useState('');
  const [program, setprogram] = useState('');

	
	const clearState = () => {
		setstudentnumber('');
		setfirstname('');
		setlastname('');
		setemail('');
    setphone('');
    setpassword('');
    setcity('');
    setaddress('');
    setprogram('');
	};

	const [addCourse, { loading }] = useMutation(ADD_STUDENT);

	// if (loading) return 'Submitting...';
	// if (error) return `Submission error! ${error.message}`;

	const handlesubmit = async (e) => {
		e.preventDefault();
		if (
			studentnumber === '' ||
			firstname === '' ||
			lastname === '' ||
      email === '' ||
      phone === '' ||
      password === '' ||
      city === '' ||
      address === '' ||
			program === ''
		) {
			toast.error('Please Fill Course Details!!');
		} else {
			addCourse({
				variables: {
					studentnumber:studentnumber,
      firstname:firstname,
      lastname:lastname,
      email:email,
      phone:phone,
      password:password,
      city:city,
      address:address,
      program:program
				},
			})
				.then(() => {
					toast.success('Course Added');
					clearState();
				})
				.catch((error) => {
					toast.error(error.message);
				});
		}
	};

	if (loading)
		return (
			<Container className='my-3 py-3'>
				<p>Submitting...</p>
			</Container>
		);
  return (
    <Container className='my-3 py-3'>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className='p-4 custom-shadow' style={{ background: 'lightGrey' }}>
          <h4 className='text-center'>Add Student</h4>
          <Form onSubmit={handlesubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Student Number</Form.Label>
              <Form.Control type='text' name='studentnumber' onChange={(e) => setstudentnumber(e.target.value.toUpperCase())} required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>First Name</Form.Label>
              <Form.Control type='text' name='firstname' onChange={(e) => setfirstname(e.target.value)} required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type='text' name='lastname'   onChange={(e) => setlastname(e.target.value)} required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' name='email' onChange={(e) => setemail(e.target.value)} required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Phone</Form.Label>
              <Form.Control type='text' name='phone'   onChange={(e) => setphone(e.target.value)} required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' name='password'   onChange={(e) => setpassword(e.target.value)} required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>City</Form.Label>
              <Form.Control type='text' name='city'   onChange={(e) => setcity(e.target.value)} required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Address</Form.Label>
              <Form.Control type='text' name='address'   onChange={(e) => setaddress(e.target.value)} required />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Program</Form.Label>
              <Form.Control type='text' name='program'   onChange={(e) => setprogram(e.target.value)} required />
            </Form.Group>
            <div className='text-center'>
              <Button variant='primary' type='submit'>
                Add Student
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddStudent;
