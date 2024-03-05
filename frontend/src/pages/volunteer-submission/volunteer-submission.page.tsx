import {useEffect, useState} from 'react';
import {fetchSupportRequests, createVolunteerRequest} from '@/pages/volunteer-submission/volunteer-submission.service';
import {SupportRequestDTO} from "@/pages/volunteer-submission/dtos/support-request.dto.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Container} from "@/components/ui/container.tsx";
import {Description, Header} from "@/components/ui/typography.tsx";

interface SupportRequestRowProps {
    supportRequest: SupportRequestDTO;
}

const SupportRequestRow = ({supportRequest}: SupportRequestRowProps) => {
    const {toast} = useToast();

    const handleBookClick = async () => {
        const {success, message} = await createVolunteerRequest(supportRequest.id);

        toast({
            variant: success ? 'default' : 'destructive',
            title: success ? 'Success!' : 'Something went wrong',
            description: message,
        });
    };

    return (
        <TableRow key={supportRequest.id}>
            <TableCell>{supportRequest.description}</TableCell>
            <TableCell>{supportRequest.shift.department}</TableCell>
            <TableCell>{supportRequest.shift.date}</TableCell>
            <TableCell>{`${supportRequest.shift.start_time} - ${supportRequest.shift.end_time}`}</TableCell>
            <TableCell>{supportRequest.skills_required}</TableCell>
            <TableCell>
                <Badge variant="outline">
                    {supportRequest.current_number_of_volunteers}/{supportRequest.number_needed}
                </Badge>
            </TableCell>
            <TableCell>
                <Button variant="secondary" onClick={handleBookClick}>
                    Book
                </Button>
            </TableCell>
        </TableRow>
    );
};

function VolunteerSubmissionPage() {
    const [supportRequests, setSupportRequests] = useState([]);
    const {toast} = useToast();

    useEffect(() => {
        const fetchAndSetSupportRequests = async () => {
            try {
                const data = await fetchSupportRequests();
                setSupportRequests(data);
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Failed to fetch support requests. Please try again',
                });
            }
        };

        fetchAndSetSupportRequests();
    }, []);

    function renderTableRows() {
        return supportRequests.length === 0 ?
            <Description> Either all support requests are processed (🎉) or we have a (🐞)</Description> :
            supportRequests.map((supportRequest: SupportRequestDTO) => (
                <SupportRequestRow key={supportRequest.id} supportRequest={supportRequest}/>
            ))
    }

    return (
        <Container>
            <Header>Factory Experience</Header>
            <Description>Factory support on the lines is required - do you want to volunteer for a shift at the
                factory?</Description>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Shift Description</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Skills Required</TableHead>
                        <TableHead>Slots</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {renderTableRows()}
                </TableBody>
            </Table>
        </Container>
    );
}

export default VolunteerSubmissionPage;
