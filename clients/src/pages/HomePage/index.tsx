import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getFirstEnvironmentByUserId } from '@/hooks/environmentHooks';
import Button from '@/components/ui/Button';

const HomePage = () => {
    const [isEnvironment, setIsEnvironment] = useState<boolean>(false);
    const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
        const fetchEnvironment = async () => {
            try {
                const environmentId = await getFirstEnvironmentByUserId(token);
                if (environmentId) {
                    setIsEnvironment(true);
                    navigate(`/environments/${environmentId}/forms`);
                } else {
                    console.log('Failed to get first environment of user');
                    setIsEnvironment(false);
                    // navigate('/auth/register');
                }
            } catch (error) {
                console.error(`error getting environment: ${error}`);
                navigate('/auth/signup');
            }
        };
        
        fetchEnvironment();
    }
  }, [navigate]);
  
  return (
    <>
        <Button
            onClick={() => navigate('/auth/signup')}
        >
            {!isEnvironment ? 'Get started' : 'Go to Forms'}
        </Button>
    </>
  )
}

export default HomePage
