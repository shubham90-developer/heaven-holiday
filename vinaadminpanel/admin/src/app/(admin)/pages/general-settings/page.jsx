'use client'

import ComponentContainerCard from '@/components/ComponentContainerCard'
import PageTitle from '@/components/PageTitle'
import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import {
    useGetGeneralSettingsQuery,
    useUpdateGeneralSettingsMutation,
} from '@/app/redux/api/general-settings/generalSettingsApi'

const Page = () => {
    /* ===================== API ===================== */
    const { data, isLoading } = useGetGeneralSettingsQuery()
    const [updateGeneralSettings, { isLoading: updating }] =
        useUpdateGeneralSettingsMutation()

    /* ===================== STATE ===================== */
    const [formData, setFormData] = useState({
        number: '',
        email: '',
        facebook: '',
        instagram: '',
        linkedIn: '',
        twitter: '',
        youtube: '',
        headerTab: '',
        address: '',
        iframe: '',
        freeShippingThreshold: 0,
    })

    const [logoFile, setLogoFile] = useState(null)
    const [faviconFile, setFaviconFile] = useState(null)

    /* ===================== PREFILL ===================== */
    useEffect(() => {
        if (data?.data) {
            setFormData({
                number: data.data.number || '',
                email: data.data.email || '',
                facebook: data.data.facebook || '',
                instagram: data.data.instagram || '',
                linkedIn: data.data.linkedIn || '',
                twitter: data.data.twitter || '',
                youtube: data.data.youtube || '',
                headerTab: data.data.headerTab || '',
                address: data.data.address || '',
                iframe: data.data.iframe || '',
                freeShippingThreshold: data.data.freeShippingThreshold || 0,
            })
        }
    }, [data])

    /* ===================== HANDLERS ===================== */
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = new FormData()

        Object.entries(formData).forEach(([key, value]) => {
            payload.append(key, String(value))
        })

        if (logoFile) payload.append('logo', logoFile)
        if (faviconFile) payload.append('favicon', faviconFile)

        try {
            await updateGeneralSettings(payload).unwrap()
            alert('General settings updated successfully')
        } catch (error) {
            console.error(error)
            alert('Failed to update general settings')
        }
    }

    if (isLoading) return <p>Loading...</p>

    /* ===================== UI ===================== */
    return (
        <>
            <PageTitle title="General Settings" subTitle="Settings" />

            <form onSubmit={handleSubmit}>
                {/* Contact Info */}
                <ComponentContainerCard title="Contact Information">
                    <Row>
                        <Col md={6}>
                            <label className="form-label">Phone Number</label>
                            <input
                                type="text"
                                name="number"
                                className="form-control"
                                value={formData.number}
                                onChange={handleChange}
                            />
                        </Col>

                        <Col md={6}>
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                </ComponentContainerCard>

                {/* Social Links */}
                <ComponentContainerCard title="Social Links">
                    <Row>
                        {['facebook', 'instagram', 'linkedIn', 'twitter', 'youtube'].map(
                            (item) => (
                                <Col md={6} key={item} className="mb-3">
                                    <label className="form-label text-capitalize">
                                        {item}
                                    </label>
                                    <input
                                        type="text"
                                        name={item}
                                        className="form-control"
                                        value={formData[item]}
                                        onChange={handleChange}
                                    />
                                </Col>
                            )
                        )}
                    </Row>
                </ComponentContainerCard>

                {/* Branding */}
                <ComponentContainerCard title="Branding">
                    <Row>
                        <Col md={6}>
                            <label className="form-label">Logo</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setLogoFile(e.target.files[0])}
                            />
                        </Col>

                        <Col md={6}>
                            <label className="form-label">Favicon</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setFaviconFile(e.target.files[0])}
                            />
                        </Col>

                        <Col md={12} className="mt-3">
                            <label className="form-label">Header Tab Text</label>
                            <input
                                type="text"
                                name="headerTab"
                                className="form-control"
                                value={formData.headerTab}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                </ComponentContainerCard>

                {/* Address & Map */}
                <ComponentContainerCard title="Address & Map">
                    <Row>
                        <Col md={6}>
                            <label className="form-label">Address</label>
                            <textarea
                                name="address"
                                className="form-control"
                                rows={4}
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Col>

                        <Col md={6}>
                            <label className="form-label">Google Map Iframe</label>
                            <textarea
                                name="iframe"
                                className="form-control"
                                rows={4}
                                value={formData.iframe}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                </ComponentContainerCard>

                {/* Store Settings */}
                <ComponentContainerCard title="Store Settings">
                    <Row>
                        <Col md={6}>
                            <label className="form-label">Free Shipping Threshold</label>
                            <input
                                type="number"
                                name="freeShippingThreshold"
                                className="form-control"
                                value={formData.freeShippingThreshold}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                </ComponentContainerCard>

                {/* Submit */}
                <div className="text-end mt-4">
                    <button
                        type="submit"
                        className="btn btn-primary px-4"
                        disabled={updating}
                    >
                        {updating ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default Page
