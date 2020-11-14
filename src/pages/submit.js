import React, { useEffect } from "react"
import {
  Box,
  Button,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react"
import { navigate } from "gatsby"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { Formik, Field } from "formik"

const INSERT_PLAYLIST = gql`
  mutation(
    $title: String!
    $description: String!
    $uri: String!
    $userId: String!
    $createdAt: timestamp!
  ) {
    insert_playlist(
      objects: {
        title: $title
        description: $description
        uri: $uri
        user_id: $userId
        created_at: $createdAt
      }
    ) {
      affected_rows
      returning {
        id
        title
      }
    }
  }
`

export default () => {
  const { loading, isAuthenticated, user } = useAuth0()
  const [insertPlaylist] = useMutation(INSERT_PLAYLIST)
  const toast = useToast()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate(`/`)
    }
  })

  return (
    <React.Fragment>
      <Heading as="h1">Submit a Playlist</Heading>
      <Text textAlign="center">Contribute a playlist to the community.</Text>
      <Box
        bg="gray.200"
        borderRadius={4}
        my={4}
        p="8"
        minWidth={[320, 320, 420]}
      >
        <Formik
          initialValues={{}}
          onSubmit={async values => {
            try {
              await insertPlaylist({
                variables: {
                  title: values.title,
                  description: values.description,
                  uri: values.uri,
                  userId: user.sub,
                  createdAt: new Date().toISOString(),
                },
              })
              toast({
                title: "Playlist submitted",
                description: "You're playlist was submitted successfully!",
                status: "success",
              })
            } catch {
              toast({
                title: "Error submitting",
                description: "There was a problem submitting your playlist.",
                status: "error",
              })
            }
          }}
        >
          {props => (
            <Stack as="form" onSubmit={props.handleSubmit}>
              <Field name="title">
                {({ field, form }) => (
                  <FormControl
                    mb={2}
                    isInvalid={form.errors.title && form.touched.title}
                  >
                    <FormLabel htmlFor="title">Playlist Title</FormLabel>
                    <Input
                      {...field}
                      id="title"
                      placeholder="Top 50"
                      maxLength={40}
                    />
                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="description">
                {({ field, form }) => (
                  <FormControl
                    mb={2}
                    isInvalid={
                      form.errors.description && form.touched.description
                    }
                  >
                    <FormLabel htmlFor="description">
                      Playlist Description
                    </FormLabel>
                    <Input
                      {...field}
                      id="description"
                      maxLength={120}
                      placeholder="A short sentence to describe the playlist"
                    />
                    <FormErrorMessage>
                      {form.errors.description}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field
                name="uri"
                validate={value => {
                  const split = value.split(":")
                  if (split[0] !== "spotify") return `Not a valid Spotify URI`
                  if (split[1] !== "playlist") return `Not a valid Spotify URI`
                }}
              >
                {({ field, form }) => (
                  <FormControl
                    mb={2}
                    isInvalid={form.errors.uri && form.touched.uri}
                  >
                    <FormLabel htmlFor="uri">Playlist URI</FormLabel>
                    <Input
                      {...field}
                      id="uri"
                      placeholder="spotify:playlist:1yvSA6qu5LD9jDmsdo6YUJ"
                      minLength={39}
                      maxLength={39}
                    />
                    <FormErrorMessage>{form.errors.uri}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={2}
                colorScheme="blue"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          )}
        </Formik>
      </Box>
    </React.Fragment>
  )
}
